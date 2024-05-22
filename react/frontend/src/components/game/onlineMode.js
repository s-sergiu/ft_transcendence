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
  const [randomClicked, setRandomClicked] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);
  const [winner, setWinner] = useState('');

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
    setRandomClicked(true);
    setIsWaitingForRandom(true);
    socket.emit('startRandomGame', { playerName: user.name });
  };

  const createPrivateGame = () => {
    const newGameId = (Math.floor(Math.random() * (199)) + 501).toString();


    setGameId(newGameId);
    setIsPrivateGame(true);
    setPrivateClicked(true);
    socket.emit('createPrivateGame', { gameId: newGameId, playerName: user.name });
  };

  const joinPrivateGame = () => {
    setJoinClicked(true);
    alert("Joining game: " + privateGameId + "...");
    socket.emit('joinPrivateGame', { gameId: privateGameId, playerName: user.name });
  };

  return (
    <div>
      <h2>Online Mode</h2>
      {!gameInfo ? (
        <div>
          { !randomClicked && <button onClick={startRandomGame}>Start Random Game</button>}
          {isWaitingForRandom && <p>Waiting for another player to join...</p>}
          <hr />
            <>
              <button onClick={createPrivateGame}>Create Private Game</button>
              {gameId && <p>Your Game ID: {gameId}</p>}
              {/* <p>Game ID: {gameId}</p> */}
            </>
            <hr />
            <>
              {!gameId &&  <input
              style={{ width: '150px' }}
              type="text"
              value={privateGameId}
              onChange={(e) => setPrivateGameId(e.target.value)}
              placeholder="Enter Game ID"
              />}
              <h1></h1>
              {!privateClicked && <button onClick={joinPrivateGame}>Join Private Game</button>}
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
        </div>
      ) : (
        <div>
        {!winner && <Game gameInfo={gameInfo} 
              online = {true}
              onWinnerChange={(newWinner) => setWinner(newWinner)} />}
            { winner && <h1>Winner is: {winner}</h1>}
          </div>
      )}
    </div>
  );
};

export default OnlineMode;
