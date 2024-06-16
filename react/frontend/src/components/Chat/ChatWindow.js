import React, { useState, useEffect } from 'react';
import Header from './Header';
import io from 'socket.io-client';

var URL;
var socket;
if (process.env.REACT_APP_HTTP_METHOD === 'http') {
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":4000";
	socket = io(URL);
} else {
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME 
	socket = io(URL, {   path: "/socket.io" });
}

const ChatWindow = ({ contact, onClose, onBack, login }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(contact.chatHistory || []);

  useEffect(() => {
    const receiveMessage = (msg) => {
      setChatHistory(currentHistory => [...currentHistory, msg]);
    };
    socket.on('new-message2', (msg, sender, user) => {
      if(login)
        {
      if (login == user && contact.intra == sender) {
        receiveMessage (msg);
        }}
      socket.off('new-message2');
      });
  });

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { message, time: new Date().toLocaleTimeString(), isUser: true, contactId: contact.id };
      setChatHistory([...chatHistory, newMessage]);
      console.log('newMessage', newMessage);
      console.log('atciveChat', contact.intra);
      console.log('login', login);
      socket.emit('send-message2', newMessage, login, contact.intra);
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
