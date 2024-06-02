import React, { useState, useEffect } from 'react';

function StartButton({ navigate, user}) {
  const handleStart = () => {
      navigate('modes');
  };
    return (
    <div>
      <button onClick={handleStart}>
        Start
      </button>
    </div>
  );
}

export default StartButton;

