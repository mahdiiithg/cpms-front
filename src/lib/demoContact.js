/**
 * Demo contact defaults for Call Admin / WhatsApp / header CTAs.
 * Env vars win when set on Vercel; otherwise a stable AU demo number is used.
 */

export const DEMO_ADMIN_PHONE =
  process.env.NEXT_PUBLIC_ADMIN_PHONE || '+61 400 000 142';

export const DEMO_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER || DEMO_ADMIN_PHONE;

export function digitsOnly(value) {
  return String(value || '').replace(/\D/g, '');
}

export function telHref(phone = DEMO_ADMIN_PHONE) {
  const digits = digitsOnly(phone);
  return digits ? `tel:+${digits}` : 'tel:+61400000142';
}

export function whatsappHref(message, phone = DEMO_WHATSAPP_NUMBER) {
  const digits = digitsOnly(phone) || '61400000142';
  const text = encodeURIComponent(message || '');
  return `https://wa.me/${digits}?text=${text}`;
}

export function userInitials(name, email) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  if (parts[0]) return parts[0].slice(0, 2).toUpperCase();
  if (email) return String(email).slice(0, 2).toUpperCase();
  return 'CP';
}
