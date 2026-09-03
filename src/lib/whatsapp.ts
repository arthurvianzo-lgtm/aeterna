const WHATSAPP_PHONE = "5511999999999";

const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Quero lançar uma linha de suplementos de marca própria para a minha academia com a Aeterna.";

export function buildWhatsAppLink(message = WHATSAPP_DEFAULT_MESSAGE) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

export { WHATSAPP_PHONE, WHATSAPP_DEFAULT_MESSAGE };
