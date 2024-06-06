import React, { useState, useEffect, useContext } from 'react';
import { useNotifications } from './NotificationContext';
import NotificationList from './NotificationList';
import './App.css';


const Header = ({ title, onBack, onClose, profilePic, onOptions }) => {

  const { notifications } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

    return (
      <div className="header">
        {onBack && <button onClick={onBack} className="header-button">{'<'}</button>}
        {profilePic && <img src={profilePic} alt="Profile" className="header-profile-pic" />}
        <h1 className="header-title">{title}</h1>
        {onOptions && <button onClick={onOptions} className="header-button">...</button>}
        {onClose && <button onClick={onClose} className="header-button">X</button>}
        <button onClick={() => setShowNotifications(!showNotifications)} className="header-button">
        <i className="fas fa-bell"></i> 
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
        </button>
        {showNotifications && <NotificationList />}
      </div>
  );
};

export default Header;
