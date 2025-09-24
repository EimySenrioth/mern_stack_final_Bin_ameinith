import { useState } from 'react';
import { ChatProvider } from '../../context/ChatContext/ChatProvider';
import LoginModal from '../../components/common/LoginModal';
import WelcomeScreen from '../../components/chat/WelcomeScreen';
import Header from '../../components/layout/Header';
import MessageItem from '../../components/chat/MessageItem';
import ChatInput from '../../components/chat/ChatInput';
import ChatPage from '../Chat/ChatPage';
import { isAuthenticated, setToken } from '../../utils/auth/token';
import '../../styles/WelcomeScreen.css';
import '../../styles/auth-bg.css';

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [auth, setAuth] = useState(isAuthenticated());

  const handleLoginSuccess = (token) => {
    if (token) {
      setToken(token);
      setAuth(true);
      setShowLogin(false);
    } else {
      localStorage.removeItem('token');
      setAuth(false); 
      setShowLogin(false);
    }
  };

  return (
    <ChatProvider>
      {!auth ? (
        <div className="auth-bg">
          <Header onObtenerPlus={() => setShowLogin(true)} />
          <WelcomeScreen />
          <div style={{ maxWidth: 600, margin: '2rem auto' }}>
            <MessageItem message={{ sender: 'user', text: '¡Bienvenido! Inicia sesión para chatear.', timestamp: Date.now() }} />
            <ChatInput onSendMessage={() => {}} isLoading={false} />
          </div>
          {/* Modal cuando NO está autenticado */}
          <LoginModal
            visible={showLogin}
            onClose={() => setShowLogin(false)}
            onLogin={handleLoginSuccess}
          />
        </div>
      ) : (
        <>
          <ChatPage onObtenerPlus={() => setShowLogin(true)} />
          {/* Modal cuando SÍ está autenticado */}
          <LoginModal
            visible={showLogin}
            onClose={() => setShowLogin(false)}
            onLogin={handleLoginSuccess}
          />
        </>
      )}
    </ChatProvider>
  );
};

export default HomePage;