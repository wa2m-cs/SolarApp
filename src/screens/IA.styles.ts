import { StyleSheet } from "react-native";

export const COLORS = {
  white: "#FFFFFF",
  cream: "#FBFFF2",
  yellow: "#FFD23F",
  yellowSoft: "#FFF8DC",
  greenDark: "#123D2A",
  green: "#2E7D32",
  greenLight: "#4CAF50",
  greenSoft: "#E8F5E9",
  text: "#1D2B24",
  muted: "#68786E",
  border: "#D8E8D2",
};

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  content: { padding: 22, paddingBottom: 48 },

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
  backButtonText: { color: COLORS.greenDark, fontWeight: "900" },

  header: { marginBottom: 24 },
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
  subtitle: { color: COLORS.muted, fontSize: 15, lineHeight: 22 },

  // ── FORMULARIO ──────────────────────────────────────────────
  formPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  panelTitle: {
    color: COLORS.greenDark,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 20,
  },

  campoGrupo: { marginBottom: 16 },
  campoLabel: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },
  campoInput: {
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
  },

  // ── DROPDOWN ─────────────────────────────────────────────────
  dropdown: {
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownTexto: { fontSize: 15, color: COLORS.text, flex: 1 },
  dropdownPlaceholder: { fontSize: 15, color: COLORS.muted, flex: 1 },
  dropdownFlecha: { fontSize: 16, color: COLORS.muted, marginLeft: 8 },

  nota: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 12,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── RESUMEN DE DATOS ─────────────────────────────────────────
  resumenPanel: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  resumenTitulo: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  filaResumen: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filaClave: { color: COLORS.muted, fontSize: 14 },
  filaValor: {
    color: COLORS.greenDark,
    fontSize: 14,
    fontWeight: "700",
    flexShrink: 1,
    textAlign: "right",
    marginLeft: 8,
  },

  // ── SECCIÓN RESULTADO ────────────────────────────────────────
  seccionTitulo: {
    color: COLORS.greenDark,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14,
  },

  // ── TARJETAS ─────────────────────────────────────────────────
  tarjeta: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tarjetaIcono: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.greenSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    flexShrink: 0,
  },
  tarjetaEmoji: { fontSize: 22 },
  tarjetaContenido: { flex: 1 },
  tarjetaTitulo: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  tarjetaValor: {
    color: COLORS.greenDark,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 4,
  },
  tarjetaDetalle: { color: COLORS.muted, fontSize: 13, lineHeight: 18 },

  // ── CONCLUSIÓN ───────────────────────────────────────────────
  conclusion: {
    backgroundColor: COLORS.yellowSoft,
    borderRadius: 20,
    padding: 20,
    marginTop: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: COLORS.yellow,
    flexDirection: "row",
    alignItems: "center",
  },
  conclusionEmoji: { fontSize: 28, marginRight: 14 },
  conclusionTexto: {
    flex: 1,
    color: COLORS.greenDark,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
  },

  // ── BOTÓN PRINCIPAL ──────────────────────────────────────────
  actionButton: {
    backgroundColor: COLORS.green,
    padding: 17,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 18,
  },
  actionButtonOff: { opacity: 0.6 },
  actionButtonText: { color: COLORS.white, fontWeight: "900", fontSize: 16 },

  // ── MODAL ─────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalPanel: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitulo: {
    color: COLORS.greenDark,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 16,
  },
  modalOpcion: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalOpcionTexto: { color: COLORS.text, fontSize: 15 },
  modalCancelar: {
    marginTop: 16,
    backgroundColor: COLORS.cream,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalCancelarTexto: { color: COLORS.muted, fontWeight: "700", fontSize: 15 },
  // ── BOTÓN SECUNDARIO ───────────────────────────────────────
  secondaryButton: {
  backgroundColor: COLORS.yellowSoft,
  padding: 15,
  borderRadius: 16,
  alignItems: "center",
  marginTop: 4,
  marginBottom: 14,
  borderWidth: 1,
  borderColor: COLORS.yellow,
},

secondaryButtonText: {
  color: COLORS.greenDark,
  fontWeight: "900",
  fontSize: 15,
},
// ── PREVISUALIZACIÓN DE FACTURA ─────────────────────────────
facturaPreview: {
  marginBottom: 16,
  alignItems: "center",
},

facturaImagen: {
  width: "100%",
  height: 220,
  borderRadius: 16,
},
});
