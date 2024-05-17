import React from 'react';
import { useNotifications } from './NotificationContext';

const NotificationsComponent = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="notifications-container">
      {notifications.map(notif => (
        <div key={notif.id} className="notification">
          {notif.message}
          <button onClick={() => removeNotification(notif.id)}>Dismiss</button>
        </div>
      ))}
    </div>
  );
};

export default NotificationsComponent;

