import React, { useState, useEffect, useContext } from 'react';
import { useNotifications } from './NotificationContext';
import Contacts from './Contacts';
import ChatWindow from './ChatWindow';
import ProfilePage from './ProfilePage';
import Header from './Header';
import logoPic from './pingpong-icon.webp';


const ChatBox = ({contacts, onBack, onClose, profilePic, socket, userId}) => {
  const [view, setView] = useState('contacts');
  const [activeChat, setActiveChat] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);

  const handleViewChange = (view) => setView(view);
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (socket) {
      socket.emit('join', { userId });
    }
    socket.on('new-friend-request', (data) => {
    console.log('Received new friend request:', data); 

      addNotification(`Friend request from ${data.sender}`, 'friend-request');
    });

    socket.on('new-chat-request', (data) => {
      addNotification(`Chat request from ${data.sender}`, 'chat-request');
    });

    socket.on('new-game-invite', (data) => {
      addNotification(`Game invite from ${data.sender}`, 'game-invite');
    });

    const handleRequestAccepted = (data) => {
      if (data.type === 'friend-request') {
          addNotification(`${data.senderId} accepted your friend request.`, 'friend-request-accepted');
      } else if (data.type === 'game-invite') {
      }
    };

    const handleRequestDeclined = (data) => {
        if (data.type === 'friend-request') {
            addNotification(`${data.senderId} declined your friend request.`, 'friend-request-declined');
        } else if (data.type === 'game-invite') {
        }
    };

    socket.on('request-accepted', handleRequestAccepted);
    socket.on('request-declined', handleRequestDeclined);

    return () => {
        socket.off('request-accepted', handleRequestAccepted);
        socket.off('request-declined', handleRequestDeclined);
    }
  }, [socket, addNotification, userId]);
  //   return () => {
  //     socket.off('new-friend-request');
  //     socket.off('new-chat-request');
  //     socket.off('new-game-invite');
  //   };
  // }, [socket, addNotification]);

  return (
    <div className="chat-box">
      {view === 'contacts' && <Contacts contacts={contacts} onChat={(contact) => {
        setActiveChat(contact); handleViewChange('chat');
      }} onViewProfile={(contact) => {
        setActiveProfile(contact); handleViewChange('profile');
      }} onClose={onClose} />}
      
      {view === 'chat' && activeChat && (
        <ChatWindow contact={activeChat} onClose={onClose} onBack={() => {
          setActiveChat(null);
          handleViewChange('contacts');
        }} socket={socket} />
      )}

      {view === 'profile' && activeProfile && (
        <ProfilePage contact={activeProfile} onBack={() => {
          setActiveProfile(null);
          handleViewChange('contacts');
        }} />
      )}
    </div>
  );
};

export default ChatBox;
