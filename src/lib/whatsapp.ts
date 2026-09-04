const WHATSAPP_PHONE = "5521959183710";

const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Quero lançar uma linha própria com a Aeterna. Pode me conectar com as melhores fábricas parceiras?";

export function buildWhatsAppLink(message = WHATSAPP_DEFAULT_MESSAGE) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

export { WHATSAPP_PHONE, WHATSAPP_DEFAULT_MESSAGE };
