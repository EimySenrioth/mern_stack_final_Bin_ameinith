import { useEffect, useState } from 'react';
import { useChatContext } from '../../context/ChatContext/ChatContext';
import { getConversations } from '../../services/api/conversationApi';
import Button from '../ui/Button';
import '../../styles/Sidebar.css';

const CHATS_PER_PAGE = 14; // Solo 14 conversaciones visibles al inicio

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Sidebar = () => {
  const { isSidebarOpen, clearConversation } = useChatContext();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadHistory, setReloadHistory] = useState(0);
  const [visibleChats, setVisibleChats] = useState(CHATS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      setLoading(true);
      getConversations().then(data => {
        setHistory(data);
        setLoading(false);
        setVisibleChats(CHATS_PER_PAGE); // Reinicia al abrir
      });
    }
  }, [isSidebarOpen, reloadHistory]);

  // Infinite scroll handler
  const handleScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      !loadingMore &&
      scrollTop + clientHeight >= scrollHeight - 10 &&
      visibleChats < history.length
    ) {
      setLoadingMore(true);
      await delay(2000); // Puedes cambiar a 5000 para 5 segundos
      setVisibleChats(v => Math.min(v + CHATS_PER_PAGE, history.length));
      setLoadingMore(false);
    }
  };

  if (!isSidebarOpen) return null;

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
        <Button
          onClick={() => {
            clearConversation();
            setReloadHistory(prev => prev + 1);
          }}
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
        <div
          className="sidebar-history-list"
          onScroll={handleScroll}
        >
          {loading ? (
            <div className="sidebar-history-empty">Cargando...</div>
          ) : history.length === 0 ? (
            <div className="sidebar-history-empty">Sin conversaciones anteriores</div>
          ) : (
            <>
              {history.slice(0, visibleChats).map((conv, idx) => (
                <Button
                  key={conv._id || idx}
                  className="sidebar-history-item"
                  variant="ghost"
                >
                  {conv.messages[0]?.text?.slice(0, 60) || 'Conversación sin mensajes'}
                </Button>
              ))}
              {loadingMore && (
                <div style={{ textAlign: 'center', padding: '1em' }}>
                  <span className="spinner" /> Cargando...
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="sidebar-user">
        <div>
          <div className="sidebar-user-name">Usuario</div>
          <div className="sidebar-user-status">Memoria guardada llena</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;