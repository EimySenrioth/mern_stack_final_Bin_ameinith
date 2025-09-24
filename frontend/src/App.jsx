import { useState } from 'react';
import { ChatProvider } from './context/ChatContext/ChatProvider';
import ChatPage from './pages/Chat/ChatPage';
import LoginModal from './components/common/LoginModal';
import { getToken, setToken, isAuthenticated } from './utils/auth/token';
import './styles/globals.css';
import HomePage from './pages/Home/HomePage';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [auth, setAuth] = useState(isAuthenticated());

  const handleLoginSuccess = (token) => {
    if (token) {
      setToken(token); // Guarda el token en localStorage
      setAuth(true); // Actualiza el estado de autenticación
      setShowLogin(false); // Cierra el modal
    } else {
      // Logout: elimina el token y actualiza el estado
      localStorage.removeItem('token');
      setAuth(false);
      setShowLogin(false);
    }
  };

  return (
    <ChatProvider>
      {!auth && <HomePage />}
      {auth && <ChatPage onObtenerPlus={() => setShowLogin(true)} />}
      <LoginModal
        visible={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLoginSuccess}
      />
    </ChatProvider>
  );
}

export default App;