import React, { useContext, useState } from 'react';
import { NotificationContext } from './NotificationContext';
import { SocketContext } from '../../SocketContext'; // Import your SocketContext 
import axios from 'axios';

const GameInviteNotification = ({ notificationId, senderId }) => {
  const { removeNotification } = useContext(NotificationContext);
  const socket = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    try {
      setIsLoading(true);

      // Update game invite status in backend (replace with your actual API endpoint)
      await axios.patch(`/api/game-invites/${notificationId}/`, { status: 'A' }); 

      // Notify backend of accepted game invite via WebSocket
      socket.emit('game.invite.accepted', { senderId, notificationId });

      // Redirect or navigate to game
      // Reda Implement game navigation logic here
    } catch (error) {
      console.error('Error accepting game invite:', error);
      // Handle error 
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async () => {
    try {
      setIsLoading(true);
      // Update game invite status in backend (replace with your actual API endpoint)
      await axios.patch(`/api/game-invites/${notificationId}/`, { status: 'D' });

      // Notify backend of declined game invite via WebSocket
      socket.emit('game.invite.declined', { senderId, notificationId });

      removeNotification(notificationId);
    } catch (error) {
      console.error('Error declining game invite:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="notification game-invite-notification">
      <p>{senderId} has invited you to a game!</p>
      <button onClick={handleAccept} disabled={isLoading}>
        {isLoading ? 'Accepting...' : 'Accept'}
      </button>
      <button onClick={handleDecline} disabled={isLoading}>
        {isLoading ? 'Declining...' : 'Decline'}
      </button>
    </div>
  );
};

export default GameInviteNotification;
