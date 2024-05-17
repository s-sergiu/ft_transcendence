// GameInfo.js
import React, { useState } from 'react';
import Game from '../game/Ping';
import Tournament from './tourn.js';

function GameInfo({ navigate, gameType }) {
  const [gameInfo, setGameInfo] = useState({
    gameId: null,
    player1: null,
    player2: null,
    playerId: null,
  });
  const [bootid, setBootid] = useState(0);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [gameState, setGameState] = useState(0);
  

  function updateGameInfo(id, play1, play2, gId, bit, stats) {
    // Set gameInfo only if it's different from the current state
    if (gameInfo.gameId !== id || gameInfo.player1 !== play1 || gameInfo.player2 !== play2 || gameInfo.playerId !== gId) {
      setGameInfo({
        gameId: id,
        player1: play1,
        player2: play2,
        playerId: gId
      });
      setBootid(bit);
      if (stats < 2)
        setGameState(stats);
      console.log("stats: " + stats);
    }
  }

  const handlePlayer1Change = (event) => {
    setPlayer1Name(event.target.value);
  };

  // Function to handle input change for player 2 name
  const handlePlayer2Change = (event) => {
    setPlayer2Name(event.target.value);
  };
  

  function fillInfos(type) {
    if (type === '1vs2') {
      updateGameInfo(0, "Player-1", "Player-2", 0, 0, 0);
      return <Game 
                gameInfo = {gameInfo}
                bootid = {bootid}
            />;
    } 
    else if (type === 'boot') {
      updateGameInfo(0, "Player", "Boot", 1, 111, 0);
      return <Game
                gameInfo = {gameInfo}
                bootid = {bootid}
            />;
    } else if (type === 'tournament') {
      return (
        <Tournament 
                gameInfo = {gameInfo}
                bootid = {bootid}
                updateGameInfo = {updateGameInfo}
        />
        // <div>
        // <label>Enter Player 1 Name:</label>
        // <input type="text" value={player1Name} onChange={handlePlayer1Change} />
        // <label>Enter Player 2 Name:</label>
        // <input type="text" value={player2Name} onChange={handlePlayer2Change} />
        
        // {player2Name && gameState != 1 && <button onClick={() => setGameState(1)}>Start Tournament</button>}
        // {gameState == 1 && updateGameInfo(0, player1Name, player2Name, 0,0, 7)}
        // {gameState == 1 && <Game gameInfo={gameInfo} bootid={bootid} />}
        // {/* {console.log("gameState: " + gameState)} */}
        // </div> 
        )}

  }
  
  // Render form for filling 4 infos based on type
  return (
    <div>
      {/* <h2>Game Information</h2>
      <p>Type: {gameType}</p> */}
      {fillInfos(gameType)}
    </div>
  );
}

export default GameInfo;
