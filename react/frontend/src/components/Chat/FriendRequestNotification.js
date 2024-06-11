import React, { useContext, useState, SocketContext } from 'react';
import { NotificationContext } from './NotificationContext';
import axios from 'axios';


const FriendRequestNotification = ({ notificationId, senderId }) => {
  const { removeNotification } = useContext(NotificationContext);
  const socket = useContext(SocketContext); // Make sure you have this context for your WebSocket connection
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    try {
      setIsLoading(true);
      // Update friendship status in backend (replace with your actual API endpoint)
      await axios.patch(`/api/friendships/${notificationId}/`, { status: 'A' }); 

      // Notify backend of accepted friend request via WebSocket
      socket.emit('friend.request.accepted', { senderId, notificationId });

      removeNotification(notificationId); 
    } catch (error) {
      console.error('Error accepting friend request:', error);
      // Handle error (display error message to the user, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async () => {
    try {
      setIsLoading(true);
      // Update friendship status in backend or delete the request (replace with your actual API endpoint)
      await axios.delete(`/api/friendships/${notificationId}/`); 

      // Notify backend of declined friend request via WebSocket
      socket.emit('friend.request.declined', { senderId, notificationId }); 

      removeNotification(notificationId);
    } catch (error) {
      console.error('Error declining friend request:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="notification friend-request-notification">
      <p>You have a friend request from {senderId}!</p>
      <button onClick={handleAccept} disabled={isLoading}>
        {isLoading ? 'Accepting...' : 'Accept'}
      </button>
      <button onClick={handleDecline} disabled={isLoading}>
        {isLoading ? 'Declining...' : 'Decline'}
      </button>
    </div>
  );
};

export default FriendRequestNotification;
