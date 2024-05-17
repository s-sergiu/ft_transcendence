import React, { useState } from 'react';
import Contacts from './Contacts';
import ChatWindow from './ChatWindow';
import ProfilePage from './ProfilePage';
import Header from './Header';
import logoPic from './pingpong-icon.webp';


const ChatBox = ({
  contacts, onBack, onClose, profilePic, socket
}) => {
  const [view, setView] = useState('contacts');
  const [activeChat, setActiveChat] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);

  const handleViewChange = (view) => setView(view);

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
      )}    </div>
  );
};

export default ChatBox;
