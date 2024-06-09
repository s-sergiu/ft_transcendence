import React, { useState, useCallback, useContext, useEffect } from 'react';
import Contacts from './Contacts';
import ChatWindow from './ChatWindow';
import './App.css';
import GuestNavbar from '../GuestNavbar.js';
import UserNavbar from '../UserNavbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import useWebSocket from './useWebSocket';
import axios from 'axios';
import NotificationsComponent from './NotificationsComponent';
import NotificationList from './NotificationList';
import { NotificationProvider, NotificationContext } from './NotificationContext';
import ChatIcon from './ChatIcon';
import ChatBox from './ChatBox';
import avatarUrl from './chat-avatar.png';
import io from 'socket.io-client';
import { SocketProvider } from '../../SocketContext';
// import { NotificationContext } from './NotificationContext';
import GetUserList from '../GetUserList';
import GetFriendList from '../GetFriendList';
// import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';

const ChatPage = ({ userData }) => {
  const [contacts, setContacts] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const { addNotification, removeNotification } = useContext(NotificationContext);
  const { userList } = GetUserList();
  const { friendList } = GetFriendList(userData.login);

  const fetchContacts = useCallback(async () => {
      try {
          const apiUrl = `<span class="math-inline">\{process\.env\.HTTP\_METHOD\}\://</span>{process.env.HOST_NAME}:${process.env.REACT_PORT}/api/friends/`;
          const response = await axios.get(apiUrl);
          
          if (response.status === 200) {
              setContacts(response.data);
          }

      } catch (error) {
          console.error('Error fetching contacts:', error);
      }
  }, []);

  useEffect(() => {
      const combinedContacts = Array.from(
        new Set([...(friendList || []), ...(userList || []).filter(user => !friendList?.includes(user))])
      );
      setContacts(combinedContacts);
  }, [userList, friendList]);

  useEffect(() => {
      const setupWebSocket = () => {
          const newSocket = io(`<span class="math-inline">\{process\.env\.HTTP\_METHOD\}\://</span>{process.env.HOST_NAME}:${process.env.REACT_PORT}/ws/chat/`);
          setSocket(newSocket);

          newSocket.on('chat.message', handleNewMessage);
          newSocket.on('friend.request', handleFriendRequest);
          newSocket.on('game.invite', handleGameInvite);
          newSocket.on('friend.request.accepted', handleFriendRequestAccepted);
          newSocket.on('friend.request.declined', handleFriendRequestDeclined);
          newSocket.on('game.invite.accepted', handleGameInviteAccepted);
          newSocket.on('game.invite.declined', handleGameInviteDeclined);
      };

      setupWebSocket();
      return () => {
          if (socket) {
              socket.disconnect();
          }
      };
  }, [socket]);


  // WebSocket Event Handlers
  const handleNewMessage = (message) => {
    setContacts(prevContacts => {
      return prevContacts.map(contact => {
        if (contact.id === message.sender.id) {
          return {
            ...contact,
            chatHistory: [...contact.chatHistory, message]
          };
        }
        return contact;
      });
    });
  };

  const handleFriendRequest = (data) => {
    addNotification({
      message: `${data.sender} sent you a friend request!`,
      type: 'friend-request',
      senderId: data.sender_id,
    });
  };

  const handleGameInvite = (data) => {
    addNotification({
      message: `${data.sender} invited you to a game!`,
      type: 'game-invite',
      senderId: data.sender_id,
    });
  };

  const handleFriendRequestAccepted = (data) => {
    // Update contacts (add new friend)
    setContacts(prevContacts => [...prevContacts, data.new_friend]);
    removeNotification(data.notification_id);
  };

  const handleFriendRequestDeclined = (data) => {
    removeNotification(data.notification_id);
  };

  const handleGameInviteAccepted = (data) => {
    // Reda handle accepted game invite -> navigate to the game)
  };

  const handleGameInviteDeclined = (data) => {
    removeNotification(data.notification_id);
  };

  // API Interaction Functions
  const sendFriendRequest = useCallback(async (receiverId) => {
    try {
      const apiUrl = `${process.env.HTTP_METHOD}://${process.env.HOST_NAME}:${process.env.REACT_PORT}/api/friend-requests/`;
      await axios.post(apiUrl, { receiver: receiverId });
      // Update UI to reflect the sent request
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  }, []);

  const acceptFriendRequest = useCallback(async (senderId) => {
    try {
      const apiUrl = `${process.env.HTTP_METHOD}://${process.env.HOST_NAME}:${process.env.REACT_PORT}/api/friendships/${senderId}/`;
      await axios.patch(apiUrl, { status: 'A' });
      // Update contacts to reflect the accepted request
      fetchContacts(); // after accepting the request
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  }, [fetchContacts]);

  const declineFriendRequest = useCallback(async (senderId) => {
    try {
      const apiUrl = `${process.env.HTTP_METHOD}://${process.env.HOST_NAME}:${process.env.REACT_PORT}/api/friendships/${senderId}/`;
      await axios.delete(apiUrl); 
      // DELETE for declining
    } catch (error) {
      console.error('Error declining friend request:', error);
    }
  }, []);

  const sendGameInvite = useCallback(async (receiverId) => {
    try {
      const apiUrl = `${process.env.HTTP_METHOD}://${process.env.HOST_NAME}:${process.env.REACT_PORT}/api/game-invites/`;
      await axios.post(apiUrl, { receiver: receiverId });
      // Update UI to reflect the sent invite
    } catch (error) {
      console.error('Error sending game invite:', error);
    }
  }, []);

  const onBlockUser = useCallback(async (userId) => {
    try {
      await axios.patch(`/api/friendships/${userId}/`, { status: 'B' });
      // Update contacts list in the frontend
      fetchContacts();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  }, []);

  const onUnblockUser = useCallback(async (userId) => {
    try {
      await axios.patch(`/api/friendships/${userId}/`, { status: 'A' });
      // Update contacts list in the frontend
      fetchContacts();
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  }, []);

  const onDeleteContact = useCallback(async (userId) => {
    try {
      await axios.delete(`/api/friendships/${userId}/`);
      // Update contacts list to remove the deleted contact
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== userId));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }, []);
  
  const onSendMessage = useCallback((messageData) => {
    if (socket) {
      socket.emit('chat.message', messageData);
      // Update local chat history in the activeChat if needed:
      setActiveChat(prevChat => ({
        ...prevChat,
        chatHistory: [...prevChat.chatHistory, messageData]
      }));
    }
  }, [socket]);

  // const onAcceptGameInvite = useCallback(async (inviteId) => {
  //   try {
  //     await axios.patch(`/api/game-invites/${inviteId}/`, { status: 'A' });
  //     removeNotification(inviteId); // Remove the invite notification
  //     // navigate('/game'); // Redirect to the game page (replace with your actual route)
  //   } catch (error) {
  //     console.error('Error accepting game invite:', error);
  //   }
  // }, []); 

  const onDeclineGameInvite = useCallback(async (inviteId) => {
    try {
      await axios.patch(`/api/game-invites/${inviteId}/`, { status: 'D' });
      removeNotification(inviteId);
    } catch (error) {
      console.error('Error declining game invite:', error);
    }
  }, []);


  const toggleChat = () => setShowChat(!showChat);
  const handleChat = (contact) => {
    setActiveChat(contact);
    setShowChat(true);
  };

  const handleClose = () => {
    setShowChat(false);
    setActiveChat(null); // Clear active chat when closing
  };

  return (
    <div className="app-container">
    <NotificationProvider>
      <SocketProvider value={socket}>
        <NotificationList />
        {!showChat && <ChatIcon toggleChat={toggleChat} />}
        {showChat && (
          <ChatBox
          contacts={contacts}
          onChat={handleChat}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          onSendFriendRequest={sendFriendRequest}
          onAcceptFriendRequest={acceptFriendRequest}
          onDeclineFriendRequest={declineFriendRequest}
          onSendGameInvite={sendGameInvite}
          onBlockUser={onBlockUser}
          onUnblockUser={onUnblockUser}
          onDeleteContact={onDeleteContact}
          onSendMessage={onSendMessage}
          // onAcceptGameInvite={onAcceptGameInvite}
          onDeclineGameInvite={onDeclineGameInvite}
          // activeChat={activeChat}
          onClose={handleClose}
          socket={socket}
          />
        )}
      </SocketProvider>
    </NotificationProvider>
    </div>
  );
};

export default ChatPage;

