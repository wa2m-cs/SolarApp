import { StyleSheet } from "react-native";

const COLORS = {
  white: "#FFFFFF",
  cream: "#FBFFF2",
  yellow: "#FFD23F",
  greenDark: "#123D2A",
  green: "#2E7D32",
  muted: "#68786E",
  border: "#D8E8D2",
};

export const styles = StyleSheet.create({
  menuContainer: {
    height: 82,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 10,
    paddingTop: 8,
    elevation: 12,
  },

  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 22,
  },

  menuItemActivo: {
    backgroundColor: COLORS.yellow,
  },

  icono: {
    fontSize: 24,
    marginBottom: 2,
  },

  texto: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "800",
  },

  textoActivo: {
    color: COLORS.greenDark,
  },
});