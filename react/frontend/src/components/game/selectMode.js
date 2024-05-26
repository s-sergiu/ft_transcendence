import React from 'react';
import './mode.css';
function ModeSelection({ navigate, user }) {
  return (
    <div className="mode-container">
      <h2>Choose Mode:</h2>
      <button onClick={() => navigate('local')}>Local</button>
      <button onClick={() => navigate('online')}>Online</button>
    </div>
  );
}

export default ModeSelection;

