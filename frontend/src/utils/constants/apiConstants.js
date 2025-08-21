export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  ENDPOINTS: {
    CHAT: '/chat',
    CONVERSATIONS: '/conversations',
    MESSAGES: '/messages'
  },
  TIMEOUT: 30000
};

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

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.",
  DEFAULT_BOT_ERROR: "Lo siento, no pude procesar tu mensaje.",
  EMPTY_MESSAGE: "Por favor, escribe un mensaje antes de enviarlo."
};
