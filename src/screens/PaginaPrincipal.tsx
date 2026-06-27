import { useState } from "react";
import {
  Modal,
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

const infoCards = [
  {
    icon: "🎯",
    title: "Misión",
    text: "Democratizar el acceso a la energía solar en El Salvador.",
    more:
      "Nuestra misión es brindar una herramienta tecnológica intuitiva que elimine la complejidad de elegir un sistema fotovoltaico. EONIX analiza las condiciones del usuario y ofrece recomendaciones claras, personalizadas y confiables para que hogares y negocios puedan reducir sus gastos eléctricos, mejorar su independencia energética y contribuir al cuidado del medio ambiente.",
  },
  {
    icon: "🌎",
    title: "Visión",
    text: "Ser la plataforma líder de energía solar en El Salvador.",
    more:
      "Visualizamos un país donde cada vivienda y empresa pueda aprovechar el potencial del sol durante todo el año. Aspiramos a convertirnos en el principal referente tecnológico en asesoría fotovoltaica, facilitando la transición hacia una generación de energía más limpia, sostenible y económicamente rentable.",
  },
  {
    icon: "💡",
    title: "Valores",
    text: "Innovación, transparencia y sostenibilidad.",
    more:
      "Trabajamos bajo cinco pilares fundamentales: innovación tecnológica para simplificar procesos, transparencia en cada recomendación, sostenibilidad ambiental, orientación total al usuario y excelencia técnica para garantizar análisis confiables.",
  },
  {
    icon: "📈",
    title: "Mercado",
    text: "La energía solar crece rápidamente en El Salvador.",
    more:
      "Cada vez más familias y empresas buscan disminuir el costo de sus facturas eléctricas. Gracias a la ubicación geográfica del país, El Salvador posee excelentes niveles de radiación solar durante todo el año.",
  },
  {
    icon: "💰",
    title: "Beneficio económico",
    text: "Reducí costos y recuperá tu inversión.",
    more:
      "La instalación de paneles solares permite disminuir el gasto mensual de electricidad, aumentar el valor de una propiedad y protegerse frente al incremento de tarifas energéticas.",
  },
  {
    icon: "☀️",
    title: "¿Por qué EONIX?",
    text: "Transformamos el sol en oportunidades.",
    more:
      "EONIX nace para cerrar la brecha entre las personas y la energía renovable. Nuestra plataforma utiliza inteligencia artificial para simplificar el análisis y acompañar al usuario.",
  },
];

const planes = [
  {
    title: "Plan Premium Mensual",
    price: "$5",
    detail: "Acceso premium durante 1 mes.",
  },
  {
    title: "Plan Premium 6 meses",
    price: "$15",
    detail: "Acceso premium durante 6 meses.",
  },
  {
    title: "Plan Premium Anual",
    price: "$25",
    detail: "Acceso premium durante 12 meses.",
  },
];

export default function PaginaPrincipal({ irIA }: Props) {
  const [abierto, setAbierto] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState("");

  const confirmarPlan = (plan: string) => {
    setPlanSeleccionado(plan);
    setModalVisible(true);
  };

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
            Plataforma conceptual para analizar espacios, facturas y recomendar
            paneles solares según las condiciones del lugar.
          </Text>

          <TouchableOpacity style={styles.mainButton} onPress={irIA}>
            <Text style={styles.mainButtonText}>Ir al módulo IA</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conocé EONIX</Text>

          {infoCards.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => setAbierto(abierto === index ? null : index)}
            >
              <Text style={styles.cardIcon}>{item.icon}</Text>

              <Text style={styles.cardTitle}>
                {item.title} {abierto === index ? "▲" : "▼"}
              </Text>

              <Text style={styles.cardText}>{item.text}</Text>

              {abierto === index ? (
                <Text style={styles.cardMore}>{item.more}</Text>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Energía limpia y accesible</Text>

          <Text style={styles.bannerText}>
            Un diseño pensado para que cualquier persona pueda entender qué
            panel solar le conviene sin necesidad de conocimientos técnicos.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planes Premium</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
          >
            {planes.map((plan, index) => (
              <View key={index} style={styles.planCard}>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planDetail}>{plan.detail}</Text>

                <TouchableOpacity
                  style={styles.planButton}
                  activeOpacity={0.85}
                  onPress={() => confirmarPlan(plan.title)}
                >
                  <Text style={styles.planButtonText}>Adquirir plan</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.footer}>© 2026 Energías Renovables Eonix</Text>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalIcon}>☀️</Text>

            <Text style={styles.modalTitle}>Confirmar plan</Text>

            <Text style={styles.modalText}>
              ¿Querés adquirir el {planSeleccionado}?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}