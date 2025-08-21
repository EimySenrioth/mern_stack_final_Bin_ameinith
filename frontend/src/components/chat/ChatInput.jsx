import { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';
import { UI_CONFIG } from '../../utils/constants/apiConstants';
import { isValidMessage } from '../../utils/helpers/messageHelpers';

/*
useState, useRef, useEffect → Hooks de React:
useState: manejar estado (el valor del input).
useRef: referencia al <textarea> para manipular su altura.
useEffect: ejecutar código cuando cambie el estado (inputValue).
*/



const ChatInput = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

/*
inputValue: almacena el texto que el usuario escribe.
textareaRef: referencia directa al <textarea>.
<textarea> crezca en altura conforme el usuario escribe, hasta un máximo, y se recalcula

*/
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, UI_CONFIG.MAX_TEXTAREA_HEIGHT)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

/*
Valida si el mensaje es correcto.
Borra el input inmediatamente para mejor UX.
Manda el mensaje al padre (onSendMessage).
*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidMessage(inputValue) || isLoading) return;

    const messageToSend = inputValue;
    setInputValue(''); 
    
    try {
      await onSendMessage(messageToSend);
    } catch (error) {
      console.error('Error in ChatInput:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-700 px-4 py-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="relative flex items-end bg-gray-800 rounded-xl border border-gray-600 focus-within:border-gray-500">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pregunta lo que quieras"
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 resize-none outline-none min-h-[44px] max-h-[200px]"
            rows="1"
            disabled={isLoading}
          />
          
          <div className="flex items-center gap-2 px-3 pb-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </Button>
            
            <Button
              type="submit"
              disabled={!isValidMessage(inputValue) || isLoading}
              loading={isLoading}
              className="bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              size="icon"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          ChatGPT puede cometer errores. Considera verificar la información importante.
        </p>
      </form>
    </div>
  );
};

export default ChatInput;