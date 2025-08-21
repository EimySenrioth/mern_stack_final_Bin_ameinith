import { useState } from 'react';
import ChatContext from './ChatContext';
import { useChat } from '../../hooks/useChat/useChat';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage';

/*
useState → para manejar estados locales simples.
useChat → hook personalizado que maneja lógica principal del chat (mensajes, envío, etc.)
useLocalStorage → hook para sincronizar estados con el localStorage del navegador
*/

export const ChatProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage('sidebar-open', true);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  
  const chatHook = useChat();

  const contextValue = {
    // Estados del chat
    ...chatHook,
    
    // Estados de la UI
    isSidebarOpen,
    setIsSidebarOpen,
    
    // Gestión de conversaciones
    currentConversationId,
    setCurrentConversationId,
    
    // Funciones adicionales
    toggleSidebar: () => setIsSidebarOpen(prev => !prev),
    
    // Configuración
    config: {
      maxMessages: 100,
      autoSave: true
    }
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};