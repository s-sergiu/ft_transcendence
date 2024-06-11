import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const wsProtocol = process.env.REACT_APP_WS_PROTOCOL || 'ws'; 
    const wsHost = process.env.HOST_NAME;
    const wsPort = process.env.REACT_PORT;

    // Construct WebSocket URL
    const wsUrl = `${wsProtocol}://${wsHost}:${wsPort}/ws/`;

    // Establish WebSocket connections for chat, friend requests, and game invites
    const newSocket = io(wsUrl, {
      transports: ['websocket'], // Force WebSocket transport (if needed)
      path: '/ws/',
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
