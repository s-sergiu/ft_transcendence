// App.js
import React, { useState } from 'react';
import ModeSelection from './selectMode.js';
import LocalModes from './localMode.js';
import OnlineMode from './onlineMode.js';
import GameInfo from './gameInfo.js';


function Mode() {
  const [currentPage, setCurrentPage] = useState('start');

  const navigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'start' && <StartButton navigate={navigate} />}
      {currentPage === 'modes' && <ModeSelection navigate={navigate} />}
      {currentPage === 'local' && <LocalModes navigate={navigate} />}
      {currentPage === 'online' && <OnlineMode navigate={navigate} />}
      {currentPage === 'game-info' && <GameInfo navigate={navigate} />}
    </div>
  );
}

export default Mode;
