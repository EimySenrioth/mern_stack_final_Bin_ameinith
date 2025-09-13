import { useState } from 'react';
import { ChatProvider } from './context/ChatContext/ChatProvider';
import ChatPage from './pages/Chat/ChatPage';
import LoginModal from './components/common/LoginModal';
import './styles/globals.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <ChatProvider>
      <ChatPage onObtenerPlus={() => setShowLogin(true)} />
      <LoginModal visible={showLogin} onClose={() => setShowLogin(false)} />
    </ChatProvider>
  );
}

export default App;