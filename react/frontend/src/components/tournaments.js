import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const Tournament = () => {
  const initialNames = ['', '', '', ''];
  const [names, setNames] = useState(initialNames);
  const [layers, setLayers] = useState([]);
  const [tournamentStarted, setTournamentStarted] = useState(false);

  const handleInputChange = (index, event) => {
    const newNames = [...names];
    newNames[index] = event.target.value;
    setNames(newNames);
  };

  const generateLayers = () => {
    const shuffledNames = [...names].sort(() => Math.random() - 0.5);
    const newLayers = [];
    for (let i = 0; i < shuffledNames.length; i += 2) {
      newLayers.push({
        player1: shuffledNames[i],
        player2: shuffledNames[i + 1],
      });
    }
    setLayers(newLayers);
    setTournamentStarted(true);
  };

  const handlePlay = (layerIndex, winner) => {
    // Here you can send the data for the game of the match
    console.log(`Match ${layerIndex + 1} winner: ${winner}`);
  };

  const regenerateTournament = () => {
    const shuffledNames = [...names].sort(() => Math.random() - 0.5);
    const newLayers = [];
    for (let i = 0; i < shuffledNames.length; i += 2) {
      newLayers.push({
        player1: shuffledNames[i],
        player2: shuffledNames[i + 1],
      });
    }
    setLayers(newLayers);
  };

  return (
    <div>
      <h2>Tournament</h2>
      <Form>
        {names.map((name, index) => (
          <Form.Group key={index}>
            <Form.Label>Friend {index + 1}</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter name for Friend ${index + 1}`}
              value={name}
              onChange={(e) => handleInputChange(index, e)}
            />
          </Form.Group>
        ))}
        {!tournamentStarted && (
          <Button variant="primary" onClick={generateLayers}>
            Start Tournament
          </Button>
        )}
      </Form>
      {tournamentStarted && (
        <div>
          <h3>Tournament has started!</h3>
          {layers.map((layer, index) => (
            <div key={index}>
              <h4>Match {index + 1}</h4>
              <p>
                {layer.player1} vs {layer.player2}
              </p>
              <Button
                variant="success"
                onClick={() => handlePlay(index, layer.player1)}
              >
                Play
              </Button>
            </div>
          ))}
        </div>
      )}
      {tournamentStarted && (
        <div style={{ marginTop: '20px' }}>
          <Button variant="secondary" onClick={regenerateTournament}>
            Regenerate Tournament
          </Button>
        </div>
      )}
    </div>
  );
};

export default Tournament;
