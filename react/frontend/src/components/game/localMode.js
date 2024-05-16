// LocalModes.js
import React from 'react';

function LocalModes({ navigate }) {
  return (
    <div>
      <h2>Choose Local Mode:</h2>
      <button onClick={() => navigate('game-info?type=1vs2')}>1vs2</button>
      <button onClick={() => navigate('game-info?type=boot')}>Boot</button>
      <button onClick={() => navigate('game-info?type=tournament')}>Tournament</button>
    </div>
  );
}

export default LocalModes;
