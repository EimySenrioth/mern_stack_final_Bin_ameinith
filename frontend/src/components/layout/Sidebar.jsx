import { useEffect, useState } from 'react';
import { useChatContext } from '../../context/ChatContext/ChatContext';
import { getConversations } from '../../services/api/conversationApi';
import Button from '../ui/Button';
import '../../styles/Sidebar.css';

const Sidebar = () => {
  const { isSidebarOpen, clearConversation } = useChatContext();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSidebarOpen) {
      setLoading(true);
      getConversations().then(data => {
        setHistory(data);
        setLoading(false);
      });
    }
  }, [isSidebarOpen]);

  if (!isSidebarOpen) return null;

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
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
      <div className="sidebar-history">
        <div className="sidebar-history-title">Historial de conversaciones</div>
        <div className="sidebar-history-list">
          {loading ? (
            <div className="sidebar-history-empty">Cargando...</div>
          ) : history.length === 0 ? (
            <div className="sidebar-history-empty">Sin conversaciones anteriores</div>
          ) : (
            history.map((conv, idx) => (
              <div key={conv._id || idx} className="sidebar-history-item">
                {conv.messages[0]?.text?.slice(0, 60) || 'Conversación sin mensajes'}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="sidebar-user">
        <div className="sidebar-user-avatar">U</div>
        <div>
          <div className="sidebar-user-name">Usuario</div>
          <div className="sidebar-user-status">Memoria guardada llena</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;