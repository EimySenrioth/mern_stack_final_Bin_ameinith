import { ChatProvider } from './context/ChatContext/ChatProvider';
import ChatPage from './pages/Chat/ChatPage';
import './styles/globals.css';

function App() {
  return (
    <ChatProvider>
      <ChatPage />
    </ChatProvider>
  );
}

export default App;