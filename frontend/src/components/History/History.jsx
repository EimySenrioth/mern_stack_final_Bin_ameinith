import { useEffect, useState } from 'react';
import { getConversations } from '../../services/api/conversationApi';
import '../../styles/History.css';

const History = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConversations().then(data => {
      setConversations(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="history-container">Cargando historial...</div>;
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="history-container">
        <div className="history-header">
          <h3>Historial de Conversaciones</h3>
        </div>
        <div className="history-empty">
          <p>No hay conversaciones aún. ¡Comienza a chatear!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h3>Historial de Conversaciones</h3>
      </div>
      <div className="history-messages">
        {conversations.map((conv) => (
          <div key={conv._id} className="conversation">
            <div className="conversation-title">
              {conv.messages[0]?.text?.slice(0, 30) || 'Conversación sin mensajes'}
            </div>
            <div className="conversation-preview">
              {conv.messages.map((message, idx) => (
                <div 
                  key={idx}
                  className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
                >
                  <span className="message-author">
                    {message.sender === 'user' ? '👤 Tú' : '🤖 DeepSeek R1'}
                  </span>
                  <span className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                  <div className="message-text">
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;