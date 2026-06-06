import { StyleSheet } from "react-native";

export const COLORS = {
  white: "#FFFFFF",
  cream: "#FBFFF2",

  yellow: "#FFD23F",
  yellowSoft: "#FFF5C7",

  greenDark: "#123D2A",
  green: "#2E7D32",
  greenSoft: "#E8F5E9",

  text: "#1D2B24",
  muted: "#68786E",
  border: "#D8E8D2",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },

  content: {
    padding: 22,
    paddingBottom: 40,
  },

  backButton: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },

  backButtonText: {
    color: COLORS.greenDark,
    fontWeight: "900",
  },

  header: {
    marginBottom: 24,
  },

  smallLabel: {
    color: COLORS.green,
    fontWeight: "900",
    letterSpacing: 1.5,
    fontSize: 12,
    marginBottom: 8,
  },

  title: {
    color: COLORS.greenDark,
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 10,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 16,
    lineHeight: 24,
  },

  scanBox: {
    height: 310,
    backgroundColor: COLORS.white,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    position: "relative",
    overflow: "hidden",
  },

  scanIcon: {
    fontSize: 62,
    marginBottom: 14,
  },

  scanTitle: {
    color: COLORS.greenDark,
    fontSize: 23,
    fontWeight: "900",
    marginBottom: 8,
    textAlign: "center",
  },

  scanText: {
    color: COLORS.muted,
    fontSize: 15,
    textAlign: "center",
  },

  cornerTopLeft: {
    position: "absolute",
    top: 22,
    left: 22,
    width: 45,
    height: 45,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: COLORS.yellow,
  },

  cornerTopRight: {
    position: "absolute",
    top: 22,
    right: 22,
    width: 45,
    height: 45,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: COLORS.yellow,
  },

  cornerBottomLeft: {
    position: "absolute",
    bottom: 22,
    left: 22,
    width: 45,
    height: 45,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: COLORS.yellow,
  },

  cornerBottomRight: {
    position: "absolute",
    bottom: 22,
    right: 22,
    width: 45,
    height: 45,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: COLORS.yellow,
  },

  statsRow: {
    flexDirection: "row",
    marginBottom: 18,
  },

  statCard: {
    flex: 1,
    backgroundColor: COLORS.greenDark,
    borderRadius: 24,
    padding: 18,
    marginRight: 10,
  },

  statNumber: {
    color: COLORS.yellow,
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 5,
  },

  statText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },

  panel: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },

  panelTitle: {
    color: COLORS.greenDark,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 16,
  },

  item: {
    flexDirection: "row",
    marginBottom: 18,
  },

  itemIcon: {
    fontSize: 30,
    marginRight: 14,
  },

  itemContent: {
    flex: 1,
  },

  itemTitle: {
    color: COLORS.greenDark,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 4,
  },

  itemText: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 20,
  },

  recommendation: {
    backgroundColor: COLORS.yellowSoft,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.yellow,
  },

  recommendationLabel: {
    color: COLORS.green,
    fontWeight: "900",
    fontSize: 13,
    marginBottom: 8,
  },

  recommendationTitle: {
    color: COLORS.greenDark,
    fontSize: 25,
    fontWeight: "900",
    marginBottom: 10,
  },

  recommendationText: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },

  actionButton: {
    backgroundColor: COLORS.green,
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
  },

  actionButtonText: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 15,
  },
});