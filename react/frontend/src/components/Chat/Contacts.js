import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import ProfilePage from './ProfilePage';
import Header from './Header';
import DeleteContact from './DeleteContact';
import avatarUrl from './chat-avatar.png';
import logoPic from './pingpong-icon.webp';

const Contacts = ({ contacts, onBack, onClose, profilePic, onChat, onBlock, onViewProfile, onDelete, socket }) => {
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
              onDeleteConfirm={() => onDelete(contact.id)}  // Ensure this prop is correctly utilized
              />
            <button onClick={() => onViewProfile(contact)}>View Profile</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
