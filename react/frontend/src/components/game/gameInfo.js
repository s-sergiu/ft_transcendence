// GameInfo.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import Chat from './Chat';
import Game from '../game/Ping';


function GameInfo() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const type = params.get('type');
  const [gameInfo, setGameInfo] = useState(null);
  const [bootid, setBootid] = useState(0);
  
    // Function to update game info
    function updateGameInfo(id, player1, player2, gameId) {
      setGameInfo({
          gameId: gameId,
          player1: player1,
          player2: player2,
          playerId : id
      });
  }

  function fillInfos(type){
    if (type === '1vs2') {
      return (
        <Game updateGameInfo={updateGameInfo(0, "pl1", "pl2", 0)} />
      );
    } else if (type === 'boot') {
      return (
        <Game updateGameInfo={updateGameInfo(0, "pl1", "Bot", 1)}
            setBootid={setBootid(111)} />
      );
    } else if (type === 'tournament') {
      return (
        <Game updateGameInfo={updateGameInfo(0, "pl1", "pl2", 0)} />
      );
    }
  }
  
  // Render form for filling 4 infos based on type
  
  return (
    <div>
      <h2>Game Information</h2>
      <p>Type: {type}</p>
      {fillInfos(type)}
      </div>
      
  );
}

export default GameInfo;
