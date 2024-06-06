import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Game from './Ping.js';
var URL;
var socket;
if (process.env.REACT_APP_HTTP_METHOD === 'http') {
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":4000";
	socket = io(URL);
} else {
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME 
	socket = io(URL, {   path: "/socket.io" });
}

const my = { id: 1, name: 'Sergiu', email: 'serguiu@gmail.com' };
const Inviter = { id: 2, nname: 'Reda', email:'reda@gmail.com' };
const friends = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Diana' },
];

const InvitedGame = ({ }) => {
    const [gameId, setGameId] = useState('');
    const [gameInfo, setGameInfo] = useState(null);
  
    useEffect(() => {
      socket.on('InviteMatch', (gameData) => {
        setGameInfo(gameData);
      });
  
      return () => {
        socket.off('InviteMatch');
      };
    }, []);

  const joinInvitedGame = () => {
    socket.emit('joinFriendGame', { email: Inviter.email, playerName: my.name });
  };


  return (
    <div>
      <h2>Online Mode</h2>
      {!gameInfo ? (
        <>
          <button onClick={joinInvitedGame}>Join</button>
        </>
      ) : (
        <Game gameInfo={gameInfo} online = {true} />
      )}
    </div>
  );
};

export default InvitedGame;
