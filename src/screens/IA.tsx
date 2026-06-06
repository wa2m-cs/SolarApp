import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { COLORS, styles } from "./IA.styles";

type Props = {
  irPrincipal: () => void;
};

export default function IA({ irPrincipal }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream} />

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={irPrincipal}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.smallLabel}>MÓDULO DE ANÁLISIS</Text>

          <Text style={styles.title}>IA Solar</Text>

          <Text style={styles.subtitle}>
            Vista conceptual donde se analizaría una imagen del espacio para
            detectar sombra, árboles, cultivos y condiciones del terreno.
          </Text>
        </View>

        <View style={styles.scanBox}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />

          <Text style={styles.scanIcon}>🏡</Text>

          <Text style={styles.scanTitle}>Escaneo visual del espacio</Text>

          <Text style={styles.scanText}>
            Aquí se mostraría la imagen subida por el usuario.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>99%</Text>
            <Text style={styles.statText}>Análisis visual</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>IA</Text>
            <Text style={styles.statText}>Recomendación asistida</Text>
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Factores detectados</Text>

          <View style={styles.item}>
            <Text style={styles.itemIcon}>🌳</Text>

            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Árboles cercanos</Text>
              <Text style={styles.itemText}>
                La app evaluaría si hay objetos que generen sombra sobre los
                paneles.
              </Text>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={styles.itemIcon}>☁️</Text>

            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Nivel de sombra</Text>
              <Text style={styles.itemText}>
                Se revisaría si el lugar recibe suficiente luz solar durante el
                día.
              </Text>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={styles.itemIcon}>🌾</Text>

            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Cultivos o terreno abierto</Text>
              <Text style={styles.itemText}>
                La app diferenciaría entre casa, finca o terreno de cultivo.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.recommendation}>
          <Text style={styles.recommendationLabel}>RESULTADO ESPERADO</Text>

          <Text style={styles.recommendationTitle}>
            Panel solar recomendado
          </Text>

          <Text style={styles.recommendationText}>
            La aplicación mostraría el tipo de panel más barato y conveniente
            según el espacio disponible y las condiciones detectadas.
          </Text>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Diseño demostrativo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}