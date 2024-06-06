import React, { useState, useEffect } from 'react';
import Header from './Header';

const ChatWindow = ({ contact, onClose, onBack, socket }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(contact.chatHistory || []);

  useEffect(() => {
    const receiveMessage = (msg) => {
      setChatHistory(currentHistory => [...currentHistory, msg]);
    };

    socket.on('new-message', receiveMessage);
    return () => socket.off('new-message', receiveMessage);
  }, [socket]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { message, time: new Date().toLocaleTimeString(), isUser: true, contactId: contact.id };
      setChatHistory([...chatHistory, newMessage]);
      socket.emit('send-message', newMessage);
      setMessage('');
    }
  };

  return (
    <div className="chat-window">
      <Header
        onBack={onBack}
        profilePic={contact.avatarUrl}
        title={`${contact.name}`}
        onOptions={() => console.log('Options clicked')}
        onClose={onClose}
      />
      <div className="chat-messages">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.isUser ? 'self-end' : ''}`}>
            <div>{msg.message}</div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => { 
            if (e.key === "Enter") 
              sendMessage(); }}
            />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
