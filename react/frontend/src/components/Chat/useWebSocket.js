import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useWebSocket = (url, events = {}) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(url);

    // Attach event listeners based on the provided events object
    for (const event in events) {
      if (events.hasOwnProperty(event)) {
        newSocket.on(event, events[event]);
      }
    }

    newSocket.on('connect', () => {
      console.log(`WebSocket connected to ${url}:`, newSocket.id);
    });

    newSocket.on('connect_error', (error) => {
      console.error(`Connection error to ${url}:`, error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log(`WebSocket disconnected from ${url}`);
    };
  }, [url, events]); // Include events in the dependency array

  return socket;
};

export default useWebSocket;
