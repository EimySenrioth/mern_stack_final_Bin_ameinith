import { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';
import LoadingSpinner from '../common/LoadingSpinner';
import { scrollToBottom } from '../../utils/helpers/messageHelpers';
//importante para el scroll automático al final de la lista de mensajes, para mejorar la experiencia de usuario.
/*
useRef, useEffect → Hooks de React.
useRef: para guardar una referencia al final de la lista de mensajes.
useEffect: para ejecutar algo cada vez que cambien los mensajes.
MessageItem → Componente que muestra un mensaje individual.
LoadingSpinner → Indicador de carga.
scrollToBottom → Función auxiliar que mueve el scroll al final de la lista automáticamente.
*/

const MessageList = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages, isLoading]);
//Recorre el array de messages y pinta un MessageItem por cada uno.
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      
      {isLoading && (
        <div className="flex gap-4 justify-start mb-6">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="bg-gray-800 rounded-lg px-4 py-2">
            <LoadingSpinner size="sm" />
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;