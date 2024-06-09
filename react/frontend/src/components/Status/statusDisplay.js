import { update } from 'lodash';
import React, { useState, useEffect } from 'react';
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

const UserStatusLED = ({ userName }) => {
  const [status, setStatus] = useState('Offline');

  useEffect(() => {

    socket.emit('checkStatus', userName);

    socket.on('statusUpdate', (data) => {
        // console.log('data : ', data);
        // console.log(data.status);
        if (data.login === userName)
            setStatus(data.status);
    });
    return () => {
      socket.close();
    };
  });



  const renderLEDColor = () => {
    return status === 'Online' ? 'green' : 'red';
  };

  return (
    <div>
      <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: renderLEDColor() }}></div>
      {/* <button onClick={update()}></button> */}
      {/* <>{userName}</> */}
    </div>
  );
};

export default UserStatusLED;
