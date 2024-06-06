import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from './NotificationContext';
import useWebSocket from './useWebSocket';

const NotificationItem = ({ id, message, type, senderId }) => {
    const { removeNotification } = useContext(NotificationContext);
    const socket = useWebSocket('http://localhost:8000');
    const navigate = useNavigate();

    const handleAccept = () => {
        if (type === 'game-invite') {
            navigate('/');
        }

        socket.emit('accept-request', { type, senderId });
        removeNotification(id);
    };


    const handleDecline = () => {
        socket.emit('decline-request', { type, senderId });
        removeNotification(id);
    };

    return (
        <div className={`notification notification-${type}`}>
            {message}
            {/* <button onClick={handleDismiss}>Dismiss</button> */}
            <button onClick={handleAccept}>Accept</button>
            <button onClick={handleDecline}>Decline</button>
        </div>
    );
};

export default NotificationItem;
