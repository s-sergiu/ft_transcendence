// ModeSelection.js
import React from 'react';

function ModeSelection({ navigate, user }) {
  return (
    <div>
      <h2>Choose Mode:</h2>
      <button onClick={() => navigate('local')}>Local</button>
      <button onClick={() => navigate('online')}>Online</button>
    </div>
  );
}

export default ModeSelection;
