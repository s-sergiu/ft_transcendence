import React, { useState } from 'react';
import Game from '../game/Ping';

const Tournament = ({gameInfo, bootid, updateGameInfo}) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player3, setPlayer3] = useState('');
  const [player4, setPlayer4] = useState('');
  const [winner1, setWinner1] = useState('');
  const [winner2, setWinner2] = useState('');
  const [temp, setTemp] = useState(0);
  const [games, setGames] = useState([]);

  // Function to handle input change for each player
  const handleInputChange = (e, setPlayer) => {
    setPlayer(e.target.value);
  };

  // Function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to start tournament
  const startTournament = () => {
    // Shuffle the players
    const shuffledPlayers = shuffleArray([player1, player2, player3, player4]);

    // Divide shuffled players into pairs for games
    const gamesArray = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      const game = [shuffledPlayers[i], shuffledPlayers[i + 1]];
      gamesArray.push(game);
    }

    // Start the first game
    if (gamesArray.length > 0) {
      alert(`First game started between >${gamesArray[0][0]}< and >${gamesArray[0][1]}<`);
      // Here you can start the first game or perform any other action
    }

    // Update games state
    setGames(gamesArray);
    updateGameInfo(0, gamesArray[0][0], gamesArray[0][1], 0, 0, 1);
  };

  // Function to start next game
  const startNextGame = () => {
    if (games.length > 1) {
      alert(`Second game started between >${games[1][0]}< and >${games[1][1]}<`);
      updateGameInfo(0, games[1][0], games[1][1], 0, 0, 1);
      setTemp(1);
    }
  };

  const Final = () => {
    if (games.length > 1) {
      alert(`Final game started between >${winner1}< and >${winner2}<`);
      updateGameInfo(0, winner1, winner2, 0, 0, 1);
      setTemp(2);
      setWinner1('');
    }
  };

  const congrat = () => {
    if (games.length > 1) {
      alert(`Felicitation ${winner1}< You WON The Tournament`);
    }
  };

  return (
    <div>
      <h2>Tournament</h2>
      { games.length <= 0 && <div>
      <div>
        <label>Player 1:</label>
        <input type="text" value={player1} onChange={(e) => handleInputChange(e, setPlayer1)} />
      </div>
      <div>
        <label>Player 2:</label>
        <input type="text" value={player2} onChange={(e) => handleInputChange(e, setPlayer2)} />
      </div>
      <div>
        <label>Player 3:</label>
        <input type="text" value={player3} onChange={(e) => handleInputChange(e, setPlayer3)} />
      </div>
      <div>
        <label>Player 4:</label>
        <input type="text" value={player4} onChange={(e) => handleInputChange(e, setPlayer4)} />
      </div>
      <button onClick={startTournament}>Start Tournament</button>
      </div>}
      {games.length > 0 && !winner1 && !temp && <Game
                gameInfo = {gameInfo}
                bootid = {bootid}
                winner = {winner1}
                onWinnerChange={(newWinner) => setWinner1(newWinner)}
            />}
        { !temp && winner1 && <div>
      <button onClick={startNextGame}>Start Next Game</button>
      </div>}
        {games.length > 0 && !winner2 && temp == 1 && winner1 && <Game
                gameInfo = {gameInfo}
                bootid = {bootid}
                winner = {winner2}
                onWinnerChange={(newWinner) => setWinner2(newWinner)}
            />}

        {temp == 1 && winner2 && winner1 && <div>
      <button onClick={Final}>Start Final Game</button>
      </div>}
        {games.length > 0 &&  temp == 2 && !winner1 && <Game
                gameInfo = {gameInfo}
                bootid = {bootid}
                winner = {winner1}
                onWinnerChange={(newWinner) => setWinner1(newWinner)}
            />}
        {temp == 2 && !winner2 && winner1 && <div>
      {alert(`Felicitation ${winner1}< You WON The Tournament`)}
      </div>}


            
      {/* {games.length > 0 && <button onClick={startNextGame}>Start Next Game</button>} */}
    </div>
  );
};

export default Tournament;
