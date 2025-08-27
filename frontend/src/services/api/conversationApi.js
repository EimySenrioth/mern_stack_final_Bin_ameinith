export const saveConversation = async (messages) => {
  const response = await fetch('http://localhost:5000/api/conversations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });
  return response.json();
};

export const getConversations = async () => {
  const response = await fetch('http://localhost:5000/api/conversations');
  return response.json();
};