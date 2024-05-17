import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Game from './Ping.js';

const socket = io('http://localhost:4000'); // Replace with your server's address

const OnlineMode = ({ navigate }) => {
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

  const startGame = () => {
    alert("Starting game: " + gameId + "...");
    socket.emit('startGame', { gameId });
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
        </>
      ) : (
        <Game gameInfo={gameInfo} online = {true} />
      )}
    </div>
  );
};

// const Game = ({ gameInfo }) => {
//   return (
//     <div>
//       <h2>Game Started</h2>
//       <p>Game ID: {gameInfo.gameId}</p>
//       <p>Player 1: {gameInfo.player1}</p>
//       <p>Player 2: {gameInfo.player2}</p>
//       <p>Your Player ID: {gameInfo.playerId}</p>
//     </div>
//   );
// };

export default OnlineMode;





