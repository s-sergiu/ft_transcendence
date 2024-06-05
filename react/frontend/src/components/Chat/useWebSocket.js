import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(url);

    socket.on('connect', () => {
      console.log('WebSocket Connected:', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
      console.log('WebSocket Disconnected');
    };
  }, [url]);

  return socket;
};

export default useWebSocket;
