import React, { createContext, useContext, useState } from 'react';
import { Howl } from 'howler';




const NotificationContext = createContext();

const notificationSound = new Howl({
    src: ['/path/to/your/notification.mp3']
});

export const useNotifications = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type) => {
        setNotifications(prev => [...prev, { id: Date.now(), message, type }]);
        notificationSound.play(); 
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};


export { NotificationContext }; 
