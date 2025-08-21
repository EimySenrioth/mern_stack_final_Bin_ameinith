const MessageItem = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className="mb-6">
      <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        )}
        
        <div className={`max-w-[70%] ${
          isUser 
            ? 'bg-blue-600 text-white rounded-lg px-4 py-2' 
            : 'bg-gray-800 rounded-lg px-4 py-2'
        }`}>
          <p className="whitespace-pre-wrap">{message.text}</p>
          {message.timestamp && (
            <div className="text-xs opacity-70 mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
        
        {isUser && (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium">U</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;