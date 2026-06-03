import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const COLORS = {
  white: "#FFFFFF",
  offWhite: "#F8FFF3",

  greenDark: "#14532D",
  greenMain: "#2E7D32",
  greenLight: "#E8F5E9",

  yellowMain: "#FFC928",
  yellowLight: "#FFF6C7",

  textDark: "#1F2933",
  textMuted: "#65746A",

  border: "#D7E8D2",
};

type Screen = "form" | "result";
type Sombra = "Baja" | "Media" | "Alta";
type Entorno = "Casa" | "Finca" | "Cultivo";

export default function HomeScreen() {
  const [screen, setScreen] = useState<Screen>("form");

  const [metros, setMetros] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);

  // Esto simula lo que después haría la IA con la imagen
  const [sombra, setSombra] = useState<Sombra>("Media");
  const [entorno, setEntorno] = useState<Entorno>("Casa");
  const [hayArboles, setHayArboles] = useState(false);

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert(
        "Permiso requerido",
        "Necesitamos permiso para seleccionar una imagen."
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  const analizar = () => {
    if (!metros.trim()) {
      Alert.alert("Faltan datos", "Ingresa los metros disponibles.");
      return;
    }

    if (!imagen) {
      Alert.alert("Falta imagen", "Sube una imagen del lugar.");
      return;
    }

    setScreen("result");
  };

  const calcularRecomendacion = () => {
    const metrosNumero = Number(metros) || 0;

    let panel = "";
    let motivo = "";
    let precio = 0;
    let cantidad = Math.max(1, Math.floor(metrosNumero / 2));
    let potencia = "";

    if (sombra === "Alta" || hayArboles) {
      panel = "Panel monocristalino 550W";
      motivo =
        "Es la mejor opción cuando el lugar tiene sombra, árboles cerca o zonas donde no siempre pega el sol directo.";
      precio = 290;
      potencia = "Alta eficiencia";
    } else if (entorno === "Cultivo" || entorno === "Finca") {
      panel = "Panel policristalino 450W";
      motivo =
        "Es una opción más económica para espacios amplios como fincas o terrenos de cultivo.";
      precio = 230;
      potencia = "Buena relación calidad-precio";
    } else if (metrosNumero < 10) {
      panel = "Panel monocristalino 500W";
      motivo =
        "Conviene usar paneles más eficientes porque el espacio disponible es reducido.";
      precio = 270;
      potencia = "Ideal para espacios pequeños";
    } else {
      panel = "Panel policristalino 450W";
      motivo =
        "Es una opción barata y funcional cuando el espacio tiene buena entrada de sol.";
      precio = 230;
      potencia = "Opción económica";
    }

    const costoTotal = cantidad * precio;

    return {
      panel,
      motivo,
      precio,
      cantidad,
      costoTotal,
      potencia,
    };
  };

  const recomendacion = calcularRecomendacion();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.offWhite} />

      {screen === "form" && (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.logoBox}>
            <Text style={styles.logo}>☀️</Text>
          </View>

          <Text style={styles.title}>SolarScan</Text>

          <Text style={styles.subtitle}>
            Sube una imagen del lugar, coloca los metros disponibles y recibe
            una recomendación del tipo de panel solar más conveniente.
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Metros disponibles</Text>

            <Text style={styles.text}>
              Ingresa cuántos metros cuadrados están destinados para instalar
              paneles solares.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ejemplo: 20"
              placeholderTextColor="#8A9A8D"
              keyboardType="numeric"
              value={metros}
              onChangeText={setMetros}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Imagen del lugar</Text>

            <Text style={styles.text}>
              Aquí el usuario subiría una imagen del techo, finca o terreno.
            </Text>

            {imagen ? (
              <Image source={{ uri: imagen }} style={styles.previewImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageIcon}>🖼️</Text>
                <Text style={styles.imageText}>Sin imagen seleccionada</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={seleccionarImagen}
            >
              <Text style={styles.secondaryButtonText}>
                {imagen ? "Cambiar imagen" : "Subir imagen"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Simulación del análisis IA</Text>

            <Text style={styles.text}>
              Por ahora esto reemplaza a la IA. Después la IA detectaría sombra,
              árboles, cultivos y condiciones del espacio automáticamente.
            </Text>

            <Text style={styles.label}>Nivel de sombra detectado</Text>

            <View style={styles.optionsRow}>
              {(["Baja", "Media", "Alta"] as Sombra[]).map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.optionButton,
                    sombra === item && styles.optionSelected,
                  ]}
                  onPress={() => setSombra(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      sombra === item && styles.optionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Tipo de lugar</Text>

            <View style={styles.optionsRow}>
              {(["Casa", "Finca", "Cultivo"] as Entorno[]).map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.optionButton,
                    entorno === item && styles.optionSelected,
                  ]}
                  onPress={() => setEntorno(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      entorno === item && styles.optionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.optionButton,
                hayArboles && styles.optionSelected,
                styles.fullOption,
              ]}
              onPress={() => setHayArboles(!hayArboles)}
            >
              <Text
                style={[
                  styles.optionText,
                  hayArboles && styles.optionTextSelected,
                ]}
              >
                {hayArboles ? "✓ Hay árboles cerca" : "Hay árboles cerca"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={analizar}>
            <Text style={styles.buttonText}>Analizar y recomendar panel</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {screen === "result" && (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Resultado del análisis</Text>

          <Text style={styles.subtitle}>
            Recomendación del tipo de panel solar según el espacio ingresado.
          </Text>

          {imagen && <Image source={{ uri: imagen }} style={styles.resultImage} />}

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Panel recomendado</Text>
            <Text style={styles.resultTitle}>{recomendacion.panel}</Text>
            <Text style={styles.badge}>{recomendacion.potencia}</Text>
            <Text style={styles.text}>{recomendacion.motivo}</Text>
          </View>

          <View style={styles.grid}>
            <View style={styles.smallCard}>
              <Text style={styles.smallNumber}>{recomendacion.cantidad}</Text>
              <Text style={styles.smallText}>Paneles sugeridos</Text>
            </View>

            <View style={styles.smallCard}>
              <Text style={styles.smallNumber}>${recomendacion.precio}</Text>
              <Text style={styles.smallText}>Precio aprox. por panel</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Costo aproximado</Text>
            <Text style={styles.price}>${recomendacion.costoTotal}</Text>
            <Text style={styles.text}>
              Este cálculo es solo una estimación para el bosquejo de la app.
              Luego se puede conectar con precios reales.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Análisis detectado</Text>

            <Text style={styles.analysisItem}>• Metros disponibles: {metros} m²</Text>
            <Text style={styles.analysisItem}>• Sombra detectada: {sombra}</Text>
            <Text style={styles.analysisItem}>• Tipo de lugar: {entorno}</Text>
            <Text style={styles.analysisItem}>
              • Árboles cerca: {hayArboles ? "Sí" : "No"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setScreen("form")}
          >
            <Text style={styles.buttonText}>Hacer otro análisis</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  logoBox: {
    width: 92,
    height: 92,
    borderRadius: 50,
    backgroundColor: COLORS.yellowLight,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: COLORS.yellowMain,
  },

  logo: {
    fontSize: 48,
  },

  title: {
    color: COLORS.greenDark,
    fontSize: 31,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    color: COLORS.textMuted,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 23,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3,
  },

  cardTitle: {
    color: COLORS.greenDark,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },

  input: {
    backgroundColor: COLORS.offWhite,
    color: COLORS.textDark,
    borderRadius: 14,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 8,
  },

  previewImage: {
    width: "100%",
    height: 210,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 12,
  },

  resultImage: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    marginBottom: 18,
  },

  imagePlaceholder: {
    height: 180,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.border,
    backgroundColor: COLORS.offWhite,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 12,
  },

  imageIcon: {
    fontSize: 42,
    marginBottom: 8,
  },

  imageText: {
    color: COLORS.textMuted,
    fontWeight: "bold",
  },

  primaryButton: {
    backgroundColor: COLORS.greenMain,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 5,
    elevation: 4,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButton: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.greenMain,
    backgroundColor: COLORS.white,
  },

  secondaryButtonText: {
    color: COLORS.greenMain,
    fontSize: 16,
    fontWeight: "bold",
  },

  label: {
    color: COLORS.greenDark,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 12,
  },

  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },

  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    marginBottom: 10,
  },

  fullOption: {
    alignSelf: "flex-start",
    marginTop: 4,
  },

  optionSelected: {
    backgroundColor: COLORS.yellowMain,
    borderColor: COLORS.yellowMain,
  },

  optionText: {
    color: COLORS.greenDark,
    fontWeight: "bold",
  },

  optionTextSelected: {
    color: COLORS.textDark,
  },

  resultCard: {
    backgroundColor: COLORS.greenLight,
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.greenMain,
  },

  resultLabel: {
    color: COLORS.greenMain,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },

  resultTitle: {
    color: COLORS.greenDark,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.yellowMain,
    color: COLORS.textDark,
    fontWeight: "bold",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    marginBottom: 18,
  },

  smallCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
  },

  smallNumber: {
    color: COLORS.greenDark,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 6,
  },

  smallText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },

  price: {
    color: COLORS.greenMain,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },

  analysisItem: {
    color: COLORS.textMuted,
    fontSize: 15,
    marginBottom: 7,
  },
});