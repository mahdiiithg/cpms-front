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

/**
 * Initials from first + last name (preferred), then email.
 * Always prefer two-letter first+last when both exist (e.g. Alex Rivera → AR).
 */
export function userInitials(name, email, lastName) {
  const firstParts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const explicitLast = String(lastName || '').trim();

  let first = firstParts[0] || '';
  let last = explicitLast || (firstParts.length >= 2 ? firstParts[firstParts.length - 1] : '');

  // If name was already "Alex Rivera" and lastName also passed, avoid duplicating
  if (explicitLast && firstParts.length >= 2) {
    first = firstParts[0];
    last = explicitLast;
  }

  if (first && last) {
    return `${first[0]}${last[0]}`.toUpperCase();
  }
  if (first) return first.slice(0, 2).toUpperCase();
  if (email) return String(email).slice(0, 2).toUpperCase();
  return 'CP';
}
