import React, { useState } from 'react';
import Game from '../game/Ping';
import Tournament from './tourn.js';

function GameInfo({ navigate, gameType, user, gid }) {
  const [gameInfo, setGameInfo] = useState({
    gameId: null,
    player1: null,
    player2: null,
    playerId: null,
  });
  const [bootid, setBootid] = useState(0);
  const [winner, setWinner] = useState('');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [gameState, setGameState] = useState(0);
  

  function updateGameInfo(id, play1, play2, gId, bit, stats) {
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

  const handlePlayer2Change = (event) => {
    setPlayer2Name(event.target.value);
  };
  

  function fillInfos(type) {
    if (type === '1vs2') {
      updateGameInfo(gid, "Player-1", "Player-2", 0, 0, 0);
      return (
        <div>
        { !winner && <Game 
                gameInfo = {gameInfo}
                bootid = {bootid}
                onWinnerChange={(newWinner) => setWinner(newWinner)}
            />}
        { winner && <h1>Winner is: {winner}</h1>}
        </div>
          )
    } 
    else if (type === 'boot') {
      updateGameInfo(gid, user.name, "Bot", 1, 111, 0);
      return (
        <div>{!winner && <Game
                gameInfo = {gameInfo}
                bootid = {bootid}
                onWinnerChange={(newWinner) => setWinner(newWinner)}
                />}
        { winner && <h1>Winner is: {winner}</h1>}
        </div>
      )
    } else if (type === 'tournament') {
      return (
        <Tournament 
                gameInfo = {gameInfo}
                bootid = {bootid}
                updateGameInfo = {updateGameInfo}
                gid = {gid}
        />
        )}
  }
  return (
    <div>
      {fillInfos(gameType)}
    </div>
  );
}

export default GameInfo;
