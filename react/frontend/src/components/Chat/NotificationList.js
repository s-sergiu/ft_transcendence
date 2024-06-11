
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { NotificationContext } from './NotificationContext';
import useWebSocket from './useWebSocket';
import NotificationItem from './NotificationItem';
import FriendRequestNotification from './FriendRequestNotification';
import GameInviteNotification from './GameInviteNotification';

const NotificationList = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div className="notifications-list">
      {notifications.map(notif => (
        <NotificationItem 
          key={notif.id} 
          notificationId={notif.id} 
          senderId={notif.senderId} 
          message={notif.message}
          type={notif.type}
          component={notif.type === 'friend-request' ? FriendRequestNotification : GameInviteNotification}
        />
      ))}
    </div>
  );
};

export default NotificationList;
