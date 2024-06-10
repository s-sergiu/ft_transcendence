import { set, update } from 'lodash';
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
  const [ledColor, setLedColor] = useState('red');

  const update = () => {
    socket.emit('checkStatus', userName);

    socket.on('statusUpdate', (data) => {
        if (data.login === userName){
          setStatus(data.status);
          setLedColor(data.status === 'Online'? 'green' :'red');
        }
    });
    return () => {
      socket.close();
    };
  };


  return (
    <div>
      <button onClick={update} style={{ fontSize: '12px', padding: '5px 10px' }}>Update</button>
      <div style={{  marginTop: '-25px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: ledColor }}></div>
    </div>
  );
};

export default UserStatusLED;
