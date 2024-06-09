import React, { useState } from 'react';
import io from 'socket.io-client';

var URL;
var socket;
if (process.env.REACT_APP_HTTP_METHOD === 'http') {
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":4000";
	socket = io(URL);
} else {
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME 
	socket = io(URL, {   path: "/socket.io" });
}

const StatusToggle = (login) => {
  const [status, setStatus] = useState('Offline');

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    //  console.log('logiiin', login);
    socket.emit('changeStatus', newStatus, login);
  };

  return (
    <div>
      <button onClick={() => handleStatusChange('Online')}>Online</button>
      <button onClick={() => handleStatusChange('Offline')}>Offline</button>
    </div>
  );
};

export default StatusToggle;
