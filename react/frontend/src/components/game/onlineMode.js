import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Game from './Ping.js';

const socket = io('http://' + process.env.REACT_APP_HOST_IP + ':4000');


const OnlineMode = ({ navigate, user }) => {
  const [isWaitingForRandom, setIsWaitingForRandom] = useState(false);
  const [gameId, setGameId] = useState('');
  const [privateGameId, setPrivateGameId] = useState('');
  const [isPrivateGame, setIsPrivateGame] = useState(false);
  const [gameInfo, setGameInfo] = useState(null);
  const [privateClicked, setPrivateClicked] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);

  useEffect(() => {
    socket.on('randomMatch', (gameData) => {
      setGameInfo(gameData);
    });

    socket.on('privateMatch', (gameData) => {
      setGameInfo(gameData);
    });

    return () => {
      socket.off('randomMatch');
      socket.off('privateMatch');
    };
  }, []);


  const startRandomGame = () => {
    setIsWaitingForRandom(true);
    socket.emit('startRandomGame', { playerName: 'Player1' });
  };

  const createPrivateGame = () => {
    const newGameId = Math.floor(Math.random() * 99).toString();
    setGameId(newGameId);
    setIsPrivateGame(true);
    setPrivateClicked(true);
    socket.emit('createPrivateGame', { gameId: newGameId, playerName: 'Player1' });
  };

  const joinPrivateGame = () => {
    setJoinClicked(true);
    alert("Joining game: " + privateGameId + "...");
    socket.emit('joinPrivateGame', { gameId: privateGameId, playerName: 'Player2' });
  };

  return (
    <div>
      <h2>Online Mode</h2>
      {!gameInfo ? (
        <>
          <button onClick={startRandomGame}>Start Random Game</button>
          {isWaitingForRandom && <p>Waiting for another player to join...</p>}
          <hr />
            <>
              <button onClick={createPrivateGame}>Create Private Game</button>
              {gameId && <p>Your Game ID: {gameId}</p>}
              {/* <p>Game ID: {gameId}</p> */}
            </>
            <hr />
            <>
          {!privateClicked && <button onClick={joinPrivateGame}>Join Private Game</button>}
              {!gameId &&  <input
                type="text"
                value={privateGameId}
                onChange={(e) => setPrivateGameId(e.target.value)}
                placeholder="Enter Game ID"
              />}
            </>
            <>
            {/* {!privateClicked && !joinClicked && <button onClick={displayListFr}>Invite</button>} */}
                {/* <h1>Friends List</h1>
                  <ul>
                {friends.map((friend) => (
                <li key={friend.id}>
                {friend.name} {renderInviteButton(friend.id)}
                </li>
               ))}
                  </ul> */}
            </>
        </>
      ) : (
        <Game gameInfo={gameInfo} online = {true} />
      )}
    </div>
  );
};

export default OnlineMode;
