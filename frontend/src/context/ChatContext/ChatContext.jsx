import { createContext, useContext } from 'react';

const ChatContext = createContext();

/*
ChatContext será el objeto que contiene los estados y funciones compartidas del chat (por ejemplo: mensajes, 
funciones de envío, toggle de sidebar, etc.).
Inicialmente no tiene valor (undefined).
*/

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export default ChatContext;