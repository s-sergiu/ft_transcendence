// StartButton.js
import React from 'react';

function StartButton({ navigate }) {
  const handleStart = () => {
    navigate('modes');
  };

  return <button onClick={handleStart}>Start</button>;
}

export default StartButton;
