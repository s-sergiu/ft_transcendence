import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Howl } from 'howler';
import { useNotifications } from './NotificationContext';


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

  const [windowFocused, setWindowFocused] = useState(true);
  const { addNotification } = useNotifications();


  const messageSound = new Howl({
    src: ['/path/to/your/notification.mp3']
  });
 
  useEffect(() => {
    const onFocus = () => setWindowFocused(true);
    const onBlur = () => setWindowFocused(false);

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  useEffect(() => {
    const receiveMessage = (msg) => {
      setChatHistory(currentHistory => [...currentHistory, msg]);
      if (!windowFocused) {
        addNotification(`New message from ${contact.name}`, 'message');
        messageSound.play();
      }
    };

    socket.on('new-message', receiveMessage);
    return () => socket.off('new-message', receiveMessage);
  }, [socket, windowFocused, contact.name, addNotification]);

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
