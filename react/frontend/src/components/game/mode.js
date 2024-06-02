// App.js
import React, { useState } from 'react';
import ModeSelection from './selectMode.js';
import LocalModes from './localMode.js';
import OnlineMode from './onlineMode.js';
import GameInfo from './gameInfo.js';
import StartButton from './startBtn.js';
import Chat from '../Chat/Xat.js';
import { useEffect } from'react';
import { set } from 'lodash';

let user ={};

function Mode(props) {
  const [currentPage, setCurrentPage] = useState('start');
  // user = login.login;
  user.name = props.login.login;
  user.email = props.login.email;
  console.log("Props ", props);
  console.log("user ", user);
const [gameType, setGameType] = useState('');
  useEffect(() => {

    let currentComponent;

    if (currentPage === 'start') {
      currentComponent = <StartButton navigate={navigate} user={user}/>;
    } else if (currentPage === 'modes') {
      currentComponent = <ModeSelection navigate={navigate} user={user}/>;
    } else if (currentPage === 'local') {
      currentComponent = <LocalModes navigate={navigate} user={user}/>;
    } else if (currentPage === 'online') {
      currentComponent = <OnlineMode navigate={navigate} user={user}/>;
    } else if (currentPage === 'game-info') {
      currentComponent = gameType ? <GameInfo navigate={navigate} gameType={gameType} user={user} gid={Math.floor(Math.random() * 500).toString()}/> : null;
    }

    setRenderedComponent(currentComponent);
  }, [currentPage, gameType]);

  const navigate = (page, type = '') => {
    setCurrentPage(page);
    setGameType(type);
  };

  const [renderedComponent, setRenderedComponent] = useState(null);

  const goBack = () => {
    setCurrentPage('modes');
  };

  const goBackHome = () => {
    setCurrentPage('start');
  };

  return (
    <div className='div-container'>
      {renderedComponent}
      <h4 />
      <hr />
      {/* <Chat user={user} /> */}
      <div>
        {currentPage !== 'start' && (
          <button onClick={goBack}>🔙</button>
        )}
        {currentPage !== 'start' && (
          <button onClick={goBackHome}>🏠</button>
        )}
      </div>
    </div>
  );
}


export default Mode;
