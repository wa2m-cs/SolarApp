import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, styles } from "./IA.styles";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

type Props = {
  irPrincipal: () => void;
};

interface Formulario {
  area: string;
  presupuesto: string;
  consumo: string;
  ubicacion: string;
  techo: string;
  horasSol: string;
}

interface Recomendacion {
  panel: { tipo: string; razon: string };
  paneles: { cantidad: number; detalle: string };
  energia: { kwh: string; detalle: string };
  cobertura: { porcentaje: string; detalle: string };
  inversion: { costo: string; roi: string; detalle: string };
  conclusion: string;
}

const OPCIONES_TECHO = [
  "Inclinado (teja o lámina con ángulo)",
  "Plano (concreto o terraza)",
  "Lámina metálica plana",
  "Lámina metálica inclinada",
  "Mixto (parte plano, parte inclinado)",
];

const OPCIONES_HORAS_SOL = [
  "3 horas (zona muy nublada)",
  "4 horas (nublado frecuente)",
  "5 horas (promedio El Salvador)",
  "6 horas (soleado la mayoría del tiempo)",
  "7 horas (muy soleado, zona costera)",
];

const TARJETAS = [
  { key: "panel", emoji: "🔆", titulo: "Panel recomendado" },
  { key: "paneles", emoji: "📐", titulo: "Cantidad de paneles" },
  { key: "energia", emoji: "⚡", titulo: "Energía generada" },
  { key: "cobertura", emoji: "📊", titulo: "Cobertura del consumo" },
  { key: "inversion", emoji: "💰", titulo: "Inversión y retorno" },
];

export default function IA({ irPrincipal }: Props) {
  const [form, setForm] = useState<Formulario>({
    area: "",
    presupuesto: "",
    consumo: "",
    ubicacion: "",
    techo: "",
    horasSol: "",
  });
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState<Recomendacion | null>(null);
  const [modalTecho, setModalTecho] = useState(false);
  const [modalHoras, setModalHoras] = useState(false);
  const [factura, setFactura] = useState<{
    uri: string;
    base64: string;
    mimeType: string;
  } | null>(null);

  const set = (campo: keyof Formulario) => (val: string) =>
    setForm((prev) => ({ ...prev, [campo]: val }));
  const escanearFactura = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      base64: false,
    });

    if (resultado.canceled) return;

    const imagen = resultado.assets[0];

    if (!imagen.uri) {
      Alert.alert("Error", "No se pudo leer la imagen de la factura.");
      return;
    }

    const imagenReducida = await ImageManipulator.manipulateAsync(
      imagen.uri,
      [{ resize: { width: 900 } }],
      {
        compress: 0.45,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );

    if (!imagenReducida.base64) {
      Alert.alert("Error", "No se pudo procesar la imagen de la factura.");
      return;
    }

    setFactura({
      uri: imagenReducida.uri,
      base64: imagenReducida.base64,
      mimeType: "image/jpeg",
    });
  };

  const analizar = async () => {
    if (!form.area || !form.presupuesto) {
      Alert.alert(
        "Campos incompletos",
        "Completá el área y presupuesto.",
      );
      return;
    }
    setCargando(true);
    setResultado(null);
    console.log("Botón analizar presionado");

    const prompt = `Eres el asesor experto de EONIX, plataforma salvadoreña de energía solar. Analizá estos datos y respondé ÚNICAMENTE con un objeto JSON válido, sin texto extra, sin markdown, sin explicaciones fuera del JSON.

Regla importante sobre consumo:
- Si se adjunta una factura eléctrica, intentá extraer el consumo mensual en kWh desde la imagen.
- Si el campo "Consumo mensual" está vacío y la factura muestra kWh, usá el consumo de la factura.
- Si el campo "Consumo mensual" tiene dato y también la factura muestra kWh, dale prioridad al dato de la factura.
- Si no hay factura o no se logra leer el consumo, usá el dato escrito en el formulario.
- Si no hay consumo en formulario ni en factura, estimá con precaución y aclaralo dentro de los detalles.

Datos del formulario:
- Área: ${form.area} m²
- Presupuesto: $${form.presupuesto} USD
- Consumo mensual escrito: ${form.consumo || "Vacío (adjunta una factura)"} kWh/mes
- Ubicación: ${form.ubicacion || "El Salvador"}
- Techo: ${form.techo || "No especificado"}
- Horas de sol: ${form.horasSol || "5 horas (promedio El Salvador)"}

Devolvé exactamente este JSON usando el consumo más confiable según las reglas anteriores:
{
  "panel": {
    "tipo": "Nombre del tipo de panel",
    "razon": "Una sola oración explicando por qué, máximo 15 palabras"
  },
  "paneles": {
    "cantidad": 0,
    "detalle": "Una sola oración con el cálculo, máximo 12 palabras"
  },
  "energia": {
    "kwh": "000 kWh/mes",
    "detalle": "Una sola oración indicando si usaste factura o formulario, máximo 12 palabras"
  },
  "cobertura": {
    "porcentaje": "00%",
    "detalle": "Una sola oración indicando si cubre o no, máximo 12 palabras"
  },
  "inversion": {
    "costo": "$0,000 USD",
    "roi": "X años",
    "detalle": "Una sola oración sobre el ajuste al presupuesto, máximo 15 palabras"
  },
  "conclusion": "Frase motivadora de máximo 20 palabras sobre independencia energética en El Salvador"
}`;

    try {
      const apiKey = process.env.EXPO_PUBLIC_GROQ_API_KEY ?? "";
      if (!apiKey)
        throw new Error("Falta la API key de Groq en el archivo .env");

      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: factura
              ? "meta-llama/llama-4-scout-17b-16e-instruct"
              : "llama-3.3-70b-versatile",
            max_tokens: 600,
            temperature: 0.3,
            messages: [
              {
                role: "user",
                content: factura
                  ? [
                      {
                        type: "text",
                        text:
                          prompt +
                          `
                        También analizá la imagen de la factura eléctrica.
                        Detectá si parece una factura real.
                        Extraé especialmente el consumo mensual en kWh.
                        Si hay consumo en la factura, usalo como dato principal aunque el formulario tenga otro consumo.
                        Si el consumo del formulario está vacío, completalo mentalmente con el valor leído de la factura.
                        Mantené la respuesta únicamente en el JSON solicitado.`,
                      },
                      {
                        type: "image_url",
                        image_url: {
                          url: `data:${factura.mimeType};base64,${factura.base64}`,
                        },
                      },
                    ]
                  : prompt,
              },
            ],
          }),
        },
      );
      console.log("Status Groq:", res.status);
      const json = await res.json();
      console.log("Respuesta Groq:", JSON.stringify(json, null, 2));
      if (!res.ok)
        throw new Error(json?.error?.message ?? `Error ${res.status}`);

      const texto = json.choices?.[0]?.message?.content ?? "";

      // Limpiar posibles bloques de código markdown
      const limpio = texto.replace(/```json|```/g, "").trim();
      const datos: Recomendacion = JSON.parse(limpio);
      setResultado(datos);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setCargando(false);
    }
  };

  const reiniciar = () => {
    setResultado(null);
    setFactura(null);
    setForm({
      area: "",
      presupuesto: "",
      consumo: "",
      ubicacion: "",
      techo: "",
      horasSol: "",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.backButton} onPress={irPrincipal}>
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.smallLabel}>MÓDULO DE ANÁLISIS</Text>
            <Text style={styles.title}>IA Solar</Text>
            <Text style={styles.subtitle}>
              Ingresá los datos de tu espacio y recibí una recomendación
              personalizada.
            </Text>
          </View>

          {/* ── FORMULARIO ── */}
          {!resultado ? (
            <View style={styles.formPanel}>
              <Text style={styles.panelTitle}>Datos del sistema</Text>

              <Campo
                label="Área disponible (m²) *"
                placeholder="Ej: 20"
                value={form.area}
                onChange={set("area")}
                teclado="numeric"
              />
              <Campo
                label="Presupuesto (USD) *"
                placeholder="Ej: 5000"
                value={form.presupuesto}
                onChange={set("presupuesto")}
                teclado="numeric"
              />
              <Campo
                label="Consumo mensual (kWh) *"
                placeholder="Ej: 300 — ver tu factura"
                value={form.consumo}
                onChange={set("consumo")}
                teclado="numeric"
              />
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={escanearFactura}
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryButtonText}>Escanear factura eléctrica</Text>
              </TouchableOpacity>

              {factura ? (
                <View style={styles.facturaPreview}>
                  <Image
                    source={{ uri: factura.uri }}
                    style={styles.facturaImagen}
                    resizeMode="cover"
                  />
                  <Text style={styles.nota}>
                    Factura cargada correctamente. La IA la usará para mejorar el análisis.
                  </Text>
                </View>
              ) : null}
              <Campo
                label="Ubicación (ciudad o departamento)"
                placeholder="Ej: San Salvador"
                value={form.ubicacion}
                onChange={set("ubicacion")}
              />

              <View style={styles.campoGrupo}>
                <Text style={styles.campoLabel}>Tipo de techo</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setModalTecho(true)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={
                      form.techo
                        ? styles.dropdownTexto
                        : styles.dropdownPlaceholder
                    }
                  >
                    {form.techo || "Seleccioná el tipo de techo"}
                  </Text>
                  <Text style={styles.dropdownFlecha}>▾</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.campoGrupo}>
                <Text style={styles.campoLabel}>Horas de sol al día</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setModalHoras(true)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={
                      form.horasSol
                        ? styles.dropdownTexto
                        : styles.dropdownPlaceholder
                    }
                  >
                    {form.horasSol || "Seleccioná las horas de sol"}
                  </Text>
                  <Text style={styles.dropdownFlecha}>▾</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  cargando && styles.actionButtonOff,
                ]}
                onPress={analizar}
                disabled={cargando}
                activeOpacity={0.8}
              >
                {cargando ? (
                  <View style={styles.loadingRow}>
                    <ActivityIndicator color={COLORS.white} />
                    <Text style={[styles.actionButtonText, { marginLeft: 10 }]}>
                      Analizando...
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.actionButtonText}>
                    ☀️ Analizar con IA
                  </Text>
                )}
              </TouchableOpacity>
              <Text style={styles.nota}>* Campos obligatorios</Text>
            </View>
          ) : (
            /* ── RESULTADO ── */
            <View>
              {/* Resumen de datos */}
              <View style={styles.resumenPanel}>
                <Text style={styles.resumenTitulo}>Datos analizados</Text>
                <FilaDato label="Área" valor={`${form.area} m²`} />
                <FilaDato
                  label="Presupuesto"
                  valor={`$${form.presupuesto} USD`}
                />
                <FilaDato
                  label="Consumo mensual"
                  valor={
                    form.consumo && form.consumo.trim() !== ""
                      ? `${form.consumo} kWh`
                      : "Adjuntó factura"
                  }
                />
                {form.ubicacion ? (
                  <FilaDato label="Ubicación" valor={form.ubicacion} />
                ) : null}
                {form.techo ? (
                  <FilaDato label="Techo" valor={form.techo} />
                ) : null}
                {form.horasSol ? (
                  <FilaDato label="Horas de sol" valor={form.horasSol} />
                ) : null}
              </View>

              {/* Título de sección */}
              <Text style={styles.seccionTitulo}>Tu recomendación</Text>

              {/* Tarjetas por punto */}
              {TARJETAS.map((t) => {
                const dato = resultado[t.key as keyof Recomendacion] as any;
                // Sacar el valor principal y el detalle de cada tarjeta
                let valorPrincipal = "";
                let detalle = "";

                if (t.key === "panel") {
                  valorPrincipal = dato.tipo;
                  detalle = dato.razon;
                } else if (t.key === "paneles") {
                  valorPrincipal = `${dato.cantidad} paneles`;
                  detalle = dato.detalle;
                } else if (t.key === "energia") {
                  valorPrincipal = dato.kwh;
                  detalle = dato.detalle;
                } else if (t.key === "cobertura") {
                  valorPrincipal = dato.porcentaje;
                  detalle = dato.detalle;
                } else if (t.key === "inversion") {
                  valorPrincipal = `${dato.costo} · ROI ${dato.roi}`;
                  detalle = dato.detalle;
                }

                return (
                  <View key={t.key} style={styles.tarjeta}>
                    <View style={styles.tarjetaIcono}>
                      <Text style={styles.tarjetaEmoji}>{t.emoji}</Text>
                    </View>
                    <View style={styles.tarjetaContenido}>
                      <Text style={styles.tarjetaTitulo}>{t.titulo}</Text>
                      <Text style={styles.tarjetaValor}>{valorPrincipal}</Text>
                      <Text style={styles.tarjetaDetalle}>{detalle}</Text>
                    </View>
                  </View>
                );
              })}

              {/* Conclusión */}
              <View style={styles.conclusion}>
                <Text style={styles.conclusionEmoji}>🌿</Text>
                <Text style={styles.conclusionTexto}>
                  {resultado.conclusion}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={reiniciar}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>
                  Analizar otro sistema
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <ModalOpciones
        visible={modalTecho}
        titulo="Tipo de techo"
        opciones={OPCIONES_TECHO}
        onSeleccionar={(v) => {
          set("techo")(v);
          setModalTecho(false);
        }}
        onCerrar={() => setModalTecho(false)}
      />

      <ModalOpciones
        visible={modalHoras}
        titulo="Horas de sol al día"
        opciones={OPCIONES_HORAS_SOL}
        onSeleccionar={(v) => {
          set("horasSol")(v);
          setModalHoras(false);
        }}
        onCerrar={() => setModalHoras(false)}
      />
    </SafeAreaView>
  );
}

// ── Componentes internos ─────────────────────────────────────

function Campo({
  label,
  placeholder,
  value,
  onChange,
  teclado = "default",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  teclado?: "default" | "numeric";
}) {
  return (
    <View style={styles.campoGrupo}>
      <Text style={styles.campoLabel}>{label}</Text>
      <TextInput
        style={styles.campoInput}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        keyboardType={teclado}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

function FilaDato({ label, valor }: { label: string; valor: string }) {
  return (
    <View style={styles.filaResumen}>
      <Text style={styles.filaClave}>{label}</Text>
      <Text style={styles.filaValor}>{valor}</Text>
    </View>
  );
}

function ModalOpciones({
  visible,
  titulo,
  opciones,
  onSeleccionar,
  onCerrar,
}: {
  visible: boolean;
  titulo: string;
  opciones: string[];
  onSeleccionar: (v: string) => void;
  onCerrar: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCerrar}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onCerrar}
        activeOpacity={1}
      >
        <View style={styles.modalPanel}>
          <Text style={styles.modalTitulo}>{titulo}</Text>
          {opciones.map((op) => (
            <TouchableOpacity
              key={op}
              style={styles.modalOpcion}
              onPress={() => onSeleccionar(op)}
              activeOpacity={0.7}
            >
              <Text style={styles.modalOpcionTexto}>{op}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.modalCancelar} onPress={onCerrar}>
            <Text style={styles.modalCancelarTexto}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
