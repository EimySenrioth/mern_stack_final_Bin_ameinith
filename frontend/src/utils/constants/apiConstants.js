// Usare el puerto 5000 por defecto para la API, para este proyecto.
//REACT_APP_ para que se inyecten al build, nota.
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  ENDPOINTS: { // Todavia no defino los rutas, por lo que da error 404 no encontrado o similar.
    CHAT: '/chat',
    CONVERSATIONS: '/conversations',
    MESSAGES: '/messages'
  },
  TIMEOUT: 30000
};

// centraliza la configuración visual y comportamiento de la interfaz UI.
export const UI_CONFIG = {
  MAX_TEXTAREA_HEIGHT: 200,
  MIN_TEXTAREA_HEIGHT: 44,
  SCROLL_BEHAVIOR: 'smooth',
  ANIMATION_DELAY: {
    DOT_1: '0s',
    DOT_2: '0.2s',
    DOT_3: '0.4s'
  }
};

// Aqui manejo los errores para dar una ayuda visual al usurio
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.",
  DEFAULT_BOT_ERROR: "Lo siento, no pude procesar tu mensaje.",
  EMPTY_MESSAGE: "Por favor, escribe un mensaje antes de enviarlo."
};