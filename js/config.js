/**
 * YOS SALUT — Configuración global
 * Edita aquí los datos de contacto y enlaces sociales.
 */
const CONFIG = Object.freeze({
  businessName: 'YOS SALUT',
  phone: '+34 660 38 53 58',
  whatsappNumber: '34660385358',
  whatsappBaseUrl: 'https://wa.me/34660385358',
  whatsappDefaultMsg:
    'Hola,%20quiero%20reservar%20una%20sesión%20en%20YOS%20SALUT.%20Mi%20disponibilidad%20es:%20____',
  calendlyUrl: '',
  calendlyFallbackText: 'De momento la reserva online aún no está activada. Escríbenos por WhatsApp y te confirmamos la cita.',
  instagramUrl: 'https://www.instagram.com/yossalut', // ← Editar con URL real
  location: 'Vilanova del Camí, Barcelona',
  areaServed: 'Vilanova del Camí e Igualada',
  schedule: 'Lunes a sábado · 15:00–21:00',
  scheduleNote: 'Con cita previa',
});

window.CONFIG = CONFIG;

/**
 * Genera un enlace de WhatsApp con mensaje prellenado.
 * @param {string} serviceName – Nombre del servicio (ej. "Masaje Deportivo")
 * @param {string} price – Precio (ej. "40€")
 * @returns {string} URL completa de WhatsApp
 */
function waLink(serviceName, price) {
  if (!serviceName) return `${CONFIG.whatsappBaseUrl}?text=${CONFIG.whatsappDefaultMsg}`;
  const msg = encodeURIComponent(
    `Hola, quiero reservar un ${serviceName} (${price}). Mi disponibilidad es: ____`
  );
  return `${CONFIG.whatsappBaseUrl}?text=${msg}`;
}
