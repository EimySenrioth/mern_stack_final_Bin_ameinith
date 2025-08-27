import { useState, useCallback } from 'react';
import useOllama from '../useOllama/useOllama';
import { 
  createUserMessage, 
  createBotMessage, 
  createErrorMessage,
  isValidMessage 
} from '../../utils/helpers/messageHelpers';
import { ERROR_MESSAGES } from '../../utils/constants/apiConstants';
import { saveConversation } from '../../services/api/conversationApi'; // <-- Importa la función

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage: sendOllamaMessage } = useOllama();

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

  // Guarda el historial antes de limpiar
  const clearConversation = useCallback(() => {
    if (messages.length > 0) {
      saveConversation(messages);
    }
    setMessages([]);
  }, [messages]);

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