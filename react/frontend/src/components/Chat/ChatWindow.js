import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';

const ChatWindow = ({ contact, onClose, onBack, socket }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Fetch initial chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`/api/chat-messages/?receiver=${contact.id}`);
        setChatHistory(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [contact.id]); 

  useEffect(() => {
    if (socket) {
      // WebSocket event handler for new messages
      const receiveMessage = (msg) => {
        setChatHistory(prevHistory => [...prevHistory, msg]);
      };
      
      socket.on('chat.message', receiveMessage);
      return () => socket.off('chat.message', receiveMessage);
    }
  }, [socket]); // Include socket in dependency array

  const sendMessage = () => {
    if (message.trim() && socket) {
      const newMessage = { 
        content: message, 
        receiver: contact.id, // Send receiver's ID to the backend
      };
      socket.emit('chat.message', newMessage);
      setMessage(''); 
    }
  };

  return (
    <div className="chat-window">
      <Header
        onBack={onBack}
        profilePic={contact.avatarUrl} 
        title={contact.name}
        onOptions={() => console.log('Options clicked')} 
        onClose={onClose}
      />
      <div className="chat-messages">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.isUser ? 'self-end' : ''}`}>
            <div>{msg.content}</div> 
            <div className="message-time">{msg.timestamp}</div> 
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
