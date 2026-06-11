import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
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
  const [resultado, setResultado] = useState<string | null>(null);

  const set = (campo: keyof Formulario) => (val: string) =>
    setForm((prev) => ({ ...prev, [campo]: val }));

  const analizar = async () => {
    if (!form.area || !form.presupuesto || !form.consumo) {
      Alert.alert(
        "Campos incompletos",
        "Completá el área, presupuesto y consumo mensual para continuar.",
      );
      return;
    }

    setCargando(true);
    setResultado(null);

    const prompt = `
Eres el asesor experto de EONIX, una plataforma salvadoreña que democratiza el acceso a la energía solar. Tu rol es guiar a familias, comercios y desarrolladores inmobiliarios de El Salvador hacia su independencia energética con asesoría clara, honesta y sin tecnicismos innecesarios.

Datos del sistema del usuario:
- Área disponible para paneles: ${form.area} m²
- Presupuesto disponible: $${form.presupuesto} USD
- Consumo eléctrico mensual: ${form.consumo} kWh/mes
- Ubicación: ${form.ubicacion || "No especificada"}
- Tipo de techo: ${form.techo || "No especificado"}
- Horas de sol promedio al día: ${form.horasSol || "No especificadas"}

Ten en cuenta el contexto salvadoreño: alta radiación solar todo el año (en promedio 5-6 horas pico de sol si el usuario no especifica), tarifas eléctricas volátiles, y un usuario que probablemente no tiene conocimientos técnicos previos.

Respondé con estos 5 puntos, usando los datos del usuario en tus cálculos y un tono cercano y transparente:

1. TIPO DE PANEL RECOMENDADO: Indicá si es monocristalino, policristalino o de película delgada, y por qué es el mejor para este caso.
2. CANTIDAD DE PANELES: Calculá cuántos paneles estándar (~2 m²) caben en el área disponible.
3. ENERGÍA GENERADA: Estimá los kWh que generarían al mes.
4. COBERTURA DEL CONSUMO: Indicá si cubre el consumo del usuario o qué porcentaje cubriría.
5. COSTO, PRESUPUESTO Y RETORNO DE INVERSIÓN: Estimá el costo total de instalación, si se ajusta al presupuesto indicado, y aproximadamente en cuántos meses o años empezaría a generar ahorro neto (ROI).

Sé directo, usa números concretos y cerrá con una frase breve que conecte el resultado con la idea de independencia energética y ahorro a largo plazo.
    `.trim();

    try {
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? "";
      console.log(
        "API key presente:",
        apiKey ? `Sí (${apiKey.slice(0, 6)}...)` : "NO - está vacía",
      );

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const json = await res.json();
      console.log("Respuesta Gemini:", JSON.stringify(json));

      if (json.error) {
        throw new Error(json.error.message || "Error desconocido de Gemini");
      }

      const texto =
        json.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sin respuesta.";
      setResultado(texto);
    } catch (err: any) {
      console.log("Error al llamar a Gemini:", err);
      const mensaje = `No se pudo obtener la recomendación.\n${err.message}`;
      Alert.alert("Error de conexión", mensaje);
      setResultado(`⚠️ ${mensaje}`);
    } finally {
      setCargando(false);
    }
  };

  const reiniciar = () => {
    setResultado(null);
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
          {/* Botón volver */}
          <TouchableOpacity style={styles.backButton} onPress={irPrincipal}>
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.smallLabel}>MÓDULO DE ANÁLISIS</Text>
            <Text style={styles.title}>IA Solar</Text>
            <Text style={styles.subtitle}>
              Ingresá los datos de tu espacio y recibí una recomendación
              personalizada de paneles solares.
            </Text>
          </View>

          {/* Si no hay resultado: mostrar formulario */}
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
              <Campo
                label="Ubicación"
                placeholder="Ej: San Salvador, El Salvador"
                value={form.ubicacion}
                onChange={set("ubicacion")}
              />
              <Campo
                label="Tipo de techo"
                placeholder="Ej: inclinado, plano, lámina..."
                value={form.techo}
                onChange={set("techo")}
              />
              <Campo
                label="Horas de sol al día"
                placeholder="Ej: 5"
                value={form.horasSol}
                onChange={set("horasSol")}
                teclado="numeric"
              />

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
            /* Si hay resultado: mostrar la recomendación */
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
                  valor={`${form.consumo} kWh`}
                />
                {form.ubicacion ? (
                  <FilaDato label="Ubicación" valor={form.ubicacion} />
                ) : null}
                {form.techo ? (
                  <FilaDato label="Techo" valor={form.techo} />
                ) : null}
                {form.horasSol ? (
                  <FilaDato
                    label="Horas de sol"
                    valor={`${form.horasSol} h/día`}
                  />
                ) : null}
              </View>

              {/* Resultado IA */}
              <View style={styles.recommendation}>
                <Text style={styles.recommendationLabel}>
                  RESULTADO DE LA IA
                </Text>
                <Text style={styles.recommendationTitle}>
                  Recomendación solar
                </Text>
                <Text style={styles.recommendationText}>{resultado}</Text>
              </View>

              {/* Botón para analizar otro */}
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
    </SafeAreaView>
  );
}

// Componente interno: campo de formulario
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

// Componente interno: fila del resumen
function FilaDato({ label, valor }: { label: string; valor: string }) {
  return (
    <View style={styles.filaResumen}>
      <Text style={styles.filaClave}>{label}</Text>
      <Text style={styles.filaValor}>{valor}</Text>
    </View>
  );
}
