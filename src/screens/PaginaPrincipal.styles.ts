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
  cardMore: {
  marginTop: 10,
  fontSize: 14,
  lineHeight: 21,
  color: COLORS.greenDark,
  opacity: 0.85,
},

carousel: {
  gap: 14,
  paddingVertical: 10,
},

planCard: {
  width: 230,
  backgroundColor: COLORS.white,
  borderRadius: 22,
  padding: 18,
  marginRight: 14,
},

planTitle: {
  fontSize: 16,
  fontWeight: "800",
  color: COLORS.greenDark,
},

planPrice: {
  fontSize: 34,
  fontWeight: "900",
  color: COLORS.green,
  marginVertical: 8,
},

planDetail: {
  fontSize: 14,
  color: COLORS.greenDark,
  marginBottom: 14,
},

planButton: {
  backgroundColor: COLORS.green,
  paddingVertical: 12,
  borderRadius: 14,
  alignItems: "center",
},

planButtonText: {
  color: COLORS.white,
  fontWeight: "800",
},
modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.45)",
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
},

modalCard: {
  width: "100%",
  backgroundColor: COLORS.white,
  borderRadius: 26,
  padding: 24,
  alignItems: "center",
},

modalIcon: {
  fontSize: 42,
  marginBottom: 8,
},

modalTitle: {
  fontSize: 22,
  fontWeight: "900",
  color: COLORS.greenDark,
  marginBottom: 8,
},

modalText: {
  fontSize: 15,
  color: COLORS.white,
  textAlign: "center",
  marginBottom: 22,
},

modalButtons: {
  flexDirection: "row",
  gap: 12,
},

cancelButton: {
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 14,
  backgroundColor: COLORS.cream,
},

cancelButtonText: {
  fontWeight: "800",
  color: COLORS.greenDark,
},

confirmButton: {
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 14,
  backgroundColor: COLORS.green,
},

confirmButtonText: {
  fontWeight: "800",
  color: COLORS.white,
},
});
