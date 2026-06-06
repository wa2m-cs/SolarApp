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

  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  logo: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.greenDark,
    letterSpacing: 2,
  },

  navPill: {
    backgroundColor: COLORS.greenSoft,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  navText: {
    color: COLORS.green,
    fontWeight: "800",
    fontSize: 13,
  },

  hero: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    padding: 26,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 4,
    marginBottom: 28,
  },

  sunCircle: {
    width: 95,
    height: 95,
    borderRadius: 100,
    backgroundColor: COLORS.yellowSoft,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.yellow,
    marginBottom: 18,
  },

  sun: {
    fontSize: 48,
  },

  heroTag: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 10,
    textAlign: "center",
  },

  title: {
    fontSize: 36,
    fontWeight: "900",
    color: COLORS.greenDark,
    textAlign: "center",
    lineHeight: 42,
    marginBottom: 14,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 22,
  },

  mainButton: {
    backgroundColor: COLORS.green,
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderRadius: 18,
    width: "100%",
    alignItems: "center",
  },

  mainButtonText: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 16,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    color: COLORS.greenDark,
    fontSize: 25,
    fontWeight: "900",
    marginBottom: 16,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  cardIcon: {
    fontSize: 32,
    marginBottom: 10,
  },

  cardTitle: {
    color: COLORS.greenDark,
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 8,
  },

  cardText: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 22,
  },

  banner: {
    backgroundColor: COLORS.greenDark,
    borderRadius: 28,
    padding: 24,
    marginTop: 6,
  },

  bannerTitle: {
    color: COLORS.yellow,
    fontSize: 23,
    fontWeight: "900",
    marginBottom: 10,
  },

  bannerText: {
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 23,
  },

  footer: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 28,
    fontWeight: "600",
  },
});