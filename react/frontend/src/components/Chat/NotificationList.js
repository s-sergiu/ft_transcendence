import React, { useContext } from 'react';
import NotificationItem from './NotificationItem';
import { NotificationContext } from './NotificationContext'; // Direct import of NotificationContext

const NotificationList = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div className="notifications-list">
      {notifications.map(notif => (
        <NotificationItem key={notif.id} {...notif} />
      ))}
    </div>
  );
};

export default NotificationList;
