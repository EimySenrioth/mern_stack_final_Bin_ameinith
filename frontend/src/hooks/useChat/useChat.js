import { useState, useCallback } from 'react';
import useOllama from '../useOllama/useOllama';
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
useOllama → hook para enviar mensajes a Ollama.
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
  const { sendMessage: sendOllamaMessage } = useOllama();

  /*
  Validación → no se envía si el mensaje es inválido o si ya se está cargando.
  Crear mensaje de usuario → se agrega a messages.
  Activar loading → para deshabilitar input mientras llega respuesta del bot.
  Llamada a la API → Ollama.

  */

  const sendMessage = useCallback(async (inputValue) => {
    if (!isValidMessage(inputValue) || isLoading) return;

    const userMessage = createUserMessage(inputValue);
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendOllamaMessage(inputValue);
      const botMessage = createBotMessage(
        response || ERROR_MESSAGES.DEFAULT_BOT_ERROR
      );
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = createErrorMessage(ERROR_MESSAGES.NETWORK_ERROR);
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, sendOllamaMessage]);

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