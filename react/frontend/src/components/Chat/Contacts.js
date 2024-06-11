import React, { useState } from 'react';
import Header from './Header';
import DeleteContact from './DeleteContact';
import logoPic from './pingpong-icon.webp';
import axios from 'axios';
// import { Friendship } from "../api/models";
// import { FriendshipStatus } from '../../friendshipConstants';
import ChatWindow from './ChatWindow';
import ProfilePage from './ProfilePage';
import avatarUrl from './chat-avatar.png';
import { FriendshipStatus } from '../../friendshipConstants';

const Contacts = ({
  contacts,
  onChat,
  onViewProfile,
  onClose,
  onSendFriendRequest,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
  onSendGameInvite,
  onBlockUser,
  onUnblockUser,
  onDeleteContact,
}) => {

  const getFriendshipStatus = (contact) => {
    const friendship = contact.friendships.find(friendship => 
      friendship.receiver === contact.id || friendship.sender === contact.id
    );
    return friendship ? friendship.status : null;
  };

  const handleFriendRequest = (contact) => {
    const status = getFriendshipStatus(contact);

    if (status === FriendshipStatus.PENDING && contact.friendships[0].sender === contact.id) {
      onAcceptFriendRequest(contact.id);
    } else if (status === FriendshipStatus.PENDING && contact.friendships[0].receiver === contact.id) {
      onDeclineFriendRequest(contact.id);
    } else {
      onSendFriendRequest(contact.id);
    }
  };

  const handleBlockUnblock = (contact) => {
    const status = getFriendshipStatus(contact);

    if (status === FriendshipStatus.BLOCKED) {
      onUnblockUser(contact.id);
    } else {
      onBlockUser(contact.id);
    }
  };

  return (
    <div>
      <Header profilePic={logoPic} title="Game Chat" onClose={onClose} />
      {contacts.map(contact => (
        <div key={contact.id} className="contact-item">
          <img src={contact.avatarUrl} alt="Profile" className="header-profile-pic" />
          <span className="contact-name">{contact.username}</span>
          <button className="options-button" onClick={(event) => {
            const dropdown = event.currentTarget.nextElementSibling;
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
          }}>Options</button>
          <div className="options-dropdown">
            <button onClick={() => onChat(contact)}>Chat</button>
            <button onClick={() => handleFriendRequest(contact)}>
              {getFriendshipStatus(contact) === FriendshipStatus.PENDING && contact.friendships[0].sender === contact.id ? 'Accept Request' 
               : getFriendshipStatus(contact) === FriendshipStatus.PENDING && contact.friendships[0].receiver === contact.id ? 'Decline Request' 
               : getFriendshipStatus(contact) === FriendshipStatus.ACCEPTED ? 'Unfriend' 
               : 'Add Friend'} 
            </button>
            <button onClick={() => handleBlockUnblock(contact)}>
              {getFriendshipStatus(contact) === FriendshipStatus.BLOCKED ? 'Unblock' : 'Block'}
            </button>
            {
              getFriendshipStatus(contact) === FriendshipStatus.ACCEPTED && (
                <DeleteContact
                  contact={contact}
                  onDeleteConfirm={() => onDeleteContact(contact.id)}
                />
              )
            }
            <button onClick={() => onViewProfile(contact)}>View Profile</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
