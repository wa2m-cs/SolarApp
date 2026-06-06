import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { COLORS, styles } from "./PaginaPrincipal.styles";

type Props = {
  irIA: () => void;
};

export default function PaginaPrincipal({ irIA }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.navbar}>
          <Text style={styles.logo}>EONIX</Text>

          <View style={styles.navPill}>
            <Text style={styles.navText}>Solar IA</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.sunCircle}>
            <Text style={styles.sun}>☀️</Text>
          </View>

          <Text style={styles.heroTag}>ENERGÍA RENOVABLE INTELIGENTE</Text>

          <Text style={styles.title}>La inteligencia de lo renovable</Text>

          <Text style={styles.subtitle}>
            Plataforma conceptual para analizar espacios y recomendar paneles
            solares según las condiciones del lugar.
          </Text>

          <TouchableOpacity style={styles.mainButton} onPress={irIA}>
            <Text style={styles.mainButtonText}>Ir al módulo IA</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Análisis y soluciones</Text>

          <View style={styles.card}>
            <Text style={styles.cardIcon}>📍</Text>
            <Text style={styles.cardTitle}>Escaneo de ubicación</Text>
            <Text style={styles.cardText}>
              El usuario puede subir una imagen del espacio donde desea colocar
              los paneles solares.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardIcon}>🌳</Text>
            <Text style={styles.cardTitle}>Detección del entorno</Text>
            <Text style={styles.cardText}>
              Se analiza si hay árboles, sombra, cultivos o elementos que puedan
              afectar la eficiencia solar.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardIcon}>⚡</Text>
            <Text style={styles.cardTitle}>Recomendación energética</Text>
            <Text style={styles.cardText}>
              La aplicación muestra qué tipo de panel solar puede ser más
              conveniente para el usuario.
            </Text>
          </View>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Energía limpia y accesible</Text>

          <Text style={styles.bannerText}>
            Un diseño pensado para que cualquier persona pueda entender qué
            panel solar le conviene sin necesidad de conocimientos técnicos.
          </Text>
        </View>

        <Text style={styles.footer}>
          © 2026 Energías Renovables Eonix
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}