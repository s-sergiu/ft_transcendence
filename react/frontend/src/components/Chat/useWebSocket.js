import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('https://localhost:4000');

    socket.on('connect', () => {
      console.log('WebSocket Connected:', socket.id);
    });

    // socket.on('connect_error', (error) => {
    //   console.error('Connection Error:', error);
    // });

    setSocket(socket);

    return () => {
      socket.disconnect();
      console.log('WebSocket Disconnected');
    };
  }, [url]);

  return socket;
};

// useEffect(() => {
//   const newSocket = io('http://localhost:8000');
//   setSocket(newSocket);
//   return () => {
//     newSocket.disconnect();
//   };
// }, []);
// };

export default useWebSocket;
