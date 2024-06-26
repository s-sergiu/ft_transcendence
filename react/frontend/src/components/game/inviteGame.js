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
const my = { id: 1, name: 'Reda', email:'reda@gmail.com' };

const InviteGame = ({ friends, user }) => {
    const [isWaitingForRandom, setIsWaitingForRandom] = useState(false);
    const [gameId, setGameId] = useState('');
    const [gameInfo, setGameInfo] = useState(null);
  
    useEffect(() => {
      socket.on('InviteMatch', (gameData) => {
        setGameInfo(gameData);
        console.log(gameData);
      });
  
      return () => {
        socket.off('InviteMatch');
      };
    }, []);


  const createInviteGame = () => {
    const newGameId = Math.floor(Math.random() * 99).toString();
    setGameId(newGameId);
    socket.emit('createFriendGame', { email : my.email, gameId: newGameId, playerName: my.name });
  };
  return (
    <div>
      {!gameInfo ? (
        <>
          <button onClick={createInviteGame}>Pong Invite</button>
          {isWaitingForRandom && <p>Waiting for your Friend to join...</p>}
        </>
      ) : (
        <Game gameInfo={gameInfo} online = {true} />
      )}
    </div>
  );
};

export default InviteGame;
