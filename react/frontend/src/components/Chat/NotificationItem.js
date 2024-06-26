import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { NotificationContext } from './NotificationContext';
import useWebSocket from './useWebSocket';

const NotificationItem = ({ id, message, type, senderId }) => { // Include senderId prop
    const { removeNotification } = useContext(NotificationContext);
	var URL;
	var socket;
	if (process.env.REACT_APP_HTTP_METHOD === 'http') {
		URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":4000";
		socket = io(URL);
	} else {
		URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME 
		socket = io(URL, {   path: "/socket.io" });
	}
    const navigate = useNavigate(); // Get the navigation function

    const handleAccept = () => {
        if (type === 'game-invite') {
            navigate('/'); // Redirect to homepage after accepting the invite
        }

        socket.emit('accept-request', { type, senderId });
        removeNotification(id);
    };

    // const handleAccept = () => {
    //     socket.emit('accept-request', { type, senderId });
    //     removeNotification(id);
    // };

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
