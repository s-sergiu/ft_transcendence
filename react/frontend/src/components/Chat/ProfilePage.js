import React from 'react';
import Header from './Header';
import './App.css';
import ProfilePhoto from './chat-avatar.png';
import Led from '../Status/statusDisplay'

const ProfilePage = ({ contact, onBack, login }) => {
  return (
    <div className="profile-page">
      <Header title={`${contact.intra}'s Profile`} onBack={onBack} />
      <div className="profile-picNtitle">
        <img src={contact.avatarUrl || ProfilePhoto} alt={`${contact.name}'s avatar`} className="profile-avatar"/>
        <h1>{contact.name}</h1>
      </div>
      <p><div><Led userName={contact.intra}/></div></p>
      <p>Email: {contact.email}</p>
      {/* <button aria-label="Back to Contacts" onClick={onBack}>{'<'}</button> */}
    </div>
  );
};

export default ProfilePage;

