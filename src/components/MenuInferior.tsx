import { Text, TouchableOpacity, View } from "react-native";

import type { Pantalla } from "../app";
import { styles } from "./MenuInferior.styles";

type Props = {
  pantallaActiva: Pantalla;
  cambiarPantalla: (pantalla: Pantalla) => void;
};

export default function MenuInferior({
  pantallaActiva,
  cambiarPantalla,
}: Props) {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={[
          styles.menuItem,
          pantallaActiva === "principal" && styles.menuItemActivo,
        ]}
        onPress={() => cambiarPantalla("principal")}
      >
        <Text style={styles.icono}>🏠</Text>
        <Text
          style={[
            styles.texto,
            pantallaActiva === "principal" && styles.textoActivo,
          ]}
        >
          Principal
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuItem,
          pantallaActiva === "ia" && styles.menuItemActivo,
        ]}
        onPress={() => cambiarPantalla("ia")}
      >
        <Text style={styles.icono}>🤖</Text>
        <Text
          style={[
            styles.texto,
            pantallaActiva === "ia" && styles.textoActivo,
          ]}
        >
          IA
        </Text>
      </TouchableOpacity>
    </View>
  );
}