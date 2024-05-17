// App.js
import React, { useState } from 'react';
import ModeSelection from './selectMode.js';
import LocalModes from './localMode.js';
import OnlineMode from './onlineMode.js';
import GameInfo from './gameInfo.js';
import StartButton from './startBtn.js';
import { useEffect } from'react';



function Mode() {
  const [currentPage, setCurrentPage] = useState('start');
const [gameType, setGameType] = useState('');
  useEffect(() => {

    let currentComponent;

    if (currentPage === 'start') {
      currentComponent = <StartButton navigate={navigate} />;
    } else if (currentPage === 'modes') {
      currentComponent = <ModeSelection navigate={navigate} />;
    } else if (currentPage === 'local') {
      currentComponent = <LocalModes navigate={navigate} />;
    } else if (currentPage === 'online') {
      currentComponent = <OnlineMode navigate={navigate} />;
    } else if (currentPage === 'game-info') {
      currentComponent = gameType ? <GameInfo navigate={navigate} gameType={gameType} /> : null;
    }

    setRenderedComponent(currentComponent);
  }, [currentPage, gameType]);

  const navigate = (page, type = '') => {
    setCurrentPage(page);
    setGameType(type);
  };

  const [renderedComponent, setRenderedComponent] = useState(null);

  return <div>{renderedComponent}</div>;
}


export default Mode;
