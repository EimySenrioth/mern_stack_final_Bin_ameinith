// Helpers para manejo de mensajes
export const createMessage = (text, sender, id = null) => ({
  id: id || Date.now(),
  text: text.trim(),
  sender,
  timestamp: new Date()
});

export const createUserMessage = (text) => createMessage(text, 'user');

export const createBotMessage = (text) => createMessage(text, 'bot', Date.now() + 1);

export const createErrorMessage = (errorText) => createMessage(errorText, 'bot', Date.now() + 1);

// Validación de mensajes
export const isValidMessage = (message) => {
  return message && typeof message === 'string' && message.trim().length > 0;
};

// Formateo de timestamps
export const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString();
};

// Scroll automático
export const scrollToBottom = (ref) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};