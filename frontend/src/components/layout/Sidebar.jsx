import Button from '../ui/Button';
import { useChatContext } from '../../context/ChatContext/ChatContext';

const Sidebar = () => {
  const { isSidebarOpen, clearConversation } = useChatContext();

  if (!isSidebarOpen) return null;

  return (
    <div className="w-64 bg-gray-800 flex flex-col transition-all duration-300">
      <div className="p-4">
        <Button 
          onClick={clearConversation}
          variant="outline"
          className="w-full justify-start gap-3"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva conversación
        </Button>
      </div>
      
      {/* Chat History - Sinfuncionalidad*/}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="text-sm text-gray-400 mb-2">Historial de conversaciones</div>
        <div className="space-y-2">
          <div className="text-sm text-gray-500 italic">
            Sin conversaciones anteriores
          </div>
        </div>
      </div>

      {/* Emulando la UI del chatgpt */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">U</span>
          </div>
          <div>
            <div className="text-sm font-medium">Usuario</div>
            <div className="text-xs text-gray-400">Memoria guardada llena</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;