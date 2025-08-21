import { useState, useCallback } from 'react';
import { chatApi } from '../../services/api/chatApi';
import { 
  createUserMessage, 
  createBotMessage, 
  createErrorMessage,
  isValidMessage 
} from '../../utils/helpers/messageHelpers';
import { ERROR_MESSAGES } from '../../utils/constants/apiConstants';

/*
React hooks:
useState → para manejar estados (messages y isLoading).
useCallback → memoiza funciones para que no se redefinan en cada render.
chatApi → API para enviar mensajes al bot.
messageHelpers → funciones que crean distintos tipos de mensajes:
createUserMessage → mensaje enviado por el usuario.
createBotMessage → mensaje recibido del bot.
createErrorMessage → mensaje de error.
isValidMessage → valida que el mensaje no esté vacío o sea inválido.
ERROR_MESSAGES → constantes con mensajes de error predefinidos.
*/

export const useChat = () => {
  //messages → array de todos los mensajes en la conversación.
  //isLoading → indica si el bot está respondiendo
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

/*
Validación → no se envía si el mensaje es inválido o si ya se está cargando.
Crear mensaje de usuario → se agrega a messages.
Activar loading → para deshabilitar input mientras llega respuesta del bot.
Llamada a la API → chatApi.sendMessage(inputValue).
Crear mensaje del bot → si la API falla, se usa un mensaje de error por defecto.
Manejo de errores → si ocurre un error de red, se agrega un mensaje de error.
Finalizar loading → setIsLoading(false).
*/

  const sendMessage = useCallback(async (inputValue) => {
    if (!isValidMessage(inputValue) || isLoading) return;

    const userMessage = createUserMessage(inputValue);
    setMessages(prev => [...prev, userMessage]);//(...), conocido como spread operator, creas un nuevo array con los elementos antiguos más el nuevo, y luego React actualiza el estado correctamente
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage(inputValue);
      const botMessage = createBotMessage(
        response.message || ERROR_MESSAGES.DEFAULT_BOT_ERROR
      );
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = createErrorMessage(ERROR_MESSAGES.NETWORK_ERROR);
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearConversation = useCallback(() => {
    setMessages([]);
  }, []);

  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearConversation,
    addMessage
  };
};