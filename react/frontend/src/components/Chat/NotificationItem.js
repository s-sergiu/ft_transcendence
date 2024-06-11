import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from './NotificationContext';
import { SocketContext } from '../../SocketContext'; // Import your SocketContext 
import axios from 'axios';

const NotificationItem = ({ id, message, type, senderId, component: Component, ...props }) => {
  const { removeNotification } = useContext(NotificationContext);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    try {
      setIsLoading(true);

      if (type === 'friend-request') {
        // Update friendship status in backend (replace with your actual API endpoint)
        await axios.patch(`/api/friendships/${id}/`, { status: 'A' }); 

        // Notify backend of accepted friend request via WebSocket
        socket.emit('friend.request.accepted', { senderId, notificationId: id });
      } else if (type === 'game-invite') {
        // Update game invite status in backend (replace with your actual API endpoint)
        await axios.patch(`/api/game-invites/${id}/`, { status: 'A' }); 

        // Notify backend of accepted game invite via WebSocket
        socket.emit('game.invite.accepted', { senderId, notificationId: id });

        // Redirect or navigate to game
        navigate('/'); // Replace with your actual game route
      }
      
      removeNotification(id);
    } catch (error) {
      console.error(`Error accepting ${type}:`, error);
      // Handle error (display error message to the user, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async () => {
    try {
      setIsLoading(true);
      // Update friendship/game invite status in backend or delete (replace with your actual API endpoint)
      const endpoint = type === 'friend-request' ? `/api/friendships/${id}/` : `/api/game-invites/${id}/`;
      await axios.patch(endpoint, { status: 'D' }); 

      // Notify backend of declined request/invite via WebSocket
      socket.emit(`${type}.declined`, { senderId, notificationId: id }); 

      removeNotification(id);
    } catch (error) {
      console.error(`Error declining ${type}:`, error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`notification notification-${type}`}>
      <p>{message}</p>
      {Component ? ( 
        // Render custom component if provided (e.g., for friend requests or game invites)
        <Component {...props} /> 
      ) : (
        <>
          <button onClick={handleAccept} disabled={isLoading}>
            {isLoading ? 'Accepting...' : 'Accept'}
          </button>
          <button onClick={handleDecline} disabled={isLoading}>
            {isLoading ? 'Declining...' : 'Decline'}
          </button>
        </>
      )}
    </div>
  );
};

export default NotificationItem;