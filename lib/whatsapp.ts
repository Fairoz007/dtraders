// WhatsApp Integration Configuration
export const WHATSAPP_CONFIG = {
  // Replace with your WhatsApp business number
  // Format: country code + number (e.g., 1234567890 for +1 234 567 8900)
  PHONE_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890',
  
  // Business name that appears in messages
  BUSINESS_NAME: 'dtraders',
}

export function generateWhatsAppMessage(items: any[], totals: { subtotal: number; tax: number; total: number }) {
  const itemsList = items
    .map(item => `• ${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`)
    .join('\n')

  const message = `Hi ${WHATSAPP_CONFIG.BUSINESS_NAME}! 👋

I'm interested in the following items:

${itemsList}

*Order Summary:*
Subtotal: $${totals.subtotal.toFixed(2)}
Tax (10%): $${totals.tax.toFixed(2)}
*Total: $${totals.total.toFixed(2)}*

Please confirm availability and provide delivery options. Thank you!`

  return message
}

export function generateWhatsAppLink(message: string) {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_CONFIG.PHONE_NUMBER}?text=${encodedMessage}`
}

export function openWhatsAppChat(message: string) {
  const link = generateWhatsAppLink(message)
  window.open(link, '_blank', 'noopener,noreferrer')
}
