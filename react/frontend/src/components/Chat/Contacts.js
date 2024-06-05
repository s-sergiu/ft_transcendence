import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import ProfilePage from './ProfilePage';
import Header from './Header';
import DeleteContact from './DeleteContact';
import avatarUrl from './chat-avatar.png';
import logoPic from './pingpong-icon.webp';
import { useNotifications } from './NotificationContext';


const Contacts = ({ contacts, onBack, onClose, profilePic, onChat, onBlock, onViewProfile, onDelete, socket }) => {

  const { addNotification } = useNotifications();

  const handleSendFriendRequest = (recipientId) => {
    if (socket) { 
        console.log('Sending friend request to:', recipientId); 
        socket.emit('send-friend-request', { recipientId });
    }
};

const handleSendGameInvite = (recipientId) => {
    if (socket) {
        socket.emit('send-game-invite', { recipientId });
    }
};


  return (
    <div>
      <Header
        profilePic={logoPic}
        title="Game Chat"
        onClose={onClose}
        />
      {contacts.map(contact => (
        <div key={contact.id} className="contact-item">
          <img src={contact.avatarUrl} alt="Profile" className="header-profile-pic" />
          <span className="contact-name">{contact.name}</span>
          <button className="options-button" onClick={(event) => {
            const dropdown = event.currentTarget.nextElementSibling;
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
          }}>Options</button>
          <div className="options-dropdown">
            <button onClick={() => onChat(contact)}>Chat</button>
            <button onClick={() => onBlock(contact)}>Block</button>
            <DeleteContact 
              contact={contact} 
              onDeleteConfirm={() => onDelete(contact.id)}
              />
            <button onClick={() => onViewProfile(contact)}>View Profile</button>
            <button onClick={() => handleSendFriendRequest(contact.id)}>Send Friend Request</button>
            <button onClick={() => handleSendGameInvite(contact.id)}>Send Game Invite</button>          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
