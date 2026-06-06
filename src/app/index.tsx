import { useState } from "react";
import { StyleSheet, View } from "react-native";

import MenuInferior from "../components/MenuInferior";
import IA from "../screens/IA";
import PaginaPrincipal from "../screens/PaginaPrincipal";

export type Pantalla = "principal" | "ia";

export default function Index() {
  const [pantalla, setPantalla] = useState<Pantalla>("principal");

  return (
    <View style={styles.container}>
      <View style={styles.screenContent}>
        {pantalla === "principal" ? (
          <PaginaPrincipal irIA={() => setPantalla("ia")} />
        ) : (
          <IA irPrincipal={() => setPantalla("principal")} />
        )}
      </View>

      <MenuInferior pantallaActiva={pantalla} cambiarPantalla={setPantalla} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  screenContent: {
    flex: 1,
  },
});