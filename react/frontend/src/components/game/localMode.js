// LocalModes.js
import React from 'react';

function LocalModes({ navigate }) {
  return (
    <div>
      <h2>Choose Local Mode:</h2>
      <button onClick={() => navigate('game-info', '1vs2')}>1vs2</button>
      <button onClick={() => navigate('game-info', 'boot')}>Boot</button>
      <button onClick={() => navigate('game-info', 'tournament')}>Tournament</button>
    </div>
  );
}

export default LocalModes;
