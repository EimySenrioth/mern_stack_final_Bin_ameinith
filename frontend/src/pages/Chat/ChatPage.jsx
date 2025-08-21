import MainLayout from '../../components/layout/MainLayout';
import MessageList from '../../components/chat/MessageList';
import ChatInput from '../../components/chat/ChatInput';
import WelcomeScreen from '../../components/chat/WelcomeScreen';
import { useChatContext } from '../../context/ChatContext/ChatContext';

const ChatPage = () => {
  const { messages, isLoading, sendMessage } = useChatContext();
//condición ? valorSiTrue : valorSiFalse
  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}
        </div>

        {/* Input Area */}
        <ChatInput 
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </MainLayout>
  );
};

export default ChatPage;