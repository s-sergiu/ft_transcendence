import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './css/tournaments.css';

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
      newLayers.push([
        { player1: shuffledNames[i], player2: shuffledNames[i + 1] },
      ]);
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
      newLayers.push([
        { player1: shuffledNames[i], player2: shuffledNames[i + 1] },
      ]);
    }
    setLayers(newLayers);
  };

  return (
    <div className="tournament">
      <h2 className="tournament-title">Tournament</h2>
      <Form>
        {names.map((name, index) => (
          <Form.Group key={index}>
            <Form.Label className="form-label">Friend {index + 1}</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter name for Friend ${index + 1}`}
              value={name}
              onChange={(e) => handleInputChange(index, e)}
              className="form-control"
            />
          </Form.Group>
        ))}
        {!tournamentStarted && (
          <Button variant="primary" onClick={generateLayers} className="btn-primary">
            Start Tournament
          </Button>
        )}
      </Form>
      {tournamentStarted && (
        <div>
          <h3 className="tournament-title">Tournament has been generated</h3>
          {layers.map((layer, layerIndex) => (
            <div key={layerIndex} className="match-layer">
              <h4 className="match-title">Layer {layerIndex + 1}</h4>
              <div className="match-container">
                <div className="match-info">
                  <p>
                    Match 1: {layer[0].player1} vs {layer[0].player2}
                  </p>
                  <Button
                    variant="success"
                    onClick={() => handlePlay(layerIndex, layer[0].player1)}
                    className="btn-success"
                  >
                    Play
                  </Button>
                </div>
                {layer[1] && (
                  <div className="match-info">
                    <p>
                      Match 2: {layer[1].player1} vs {layer[1].player2}
                    </p>
                    <Button
                      variant="success"
                      onClick={() => handlePlay(layerIndex, layer[1].player1)}
                      className="btn-success"
                    >
                      Play
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {tournamentStarted && (
        <div style={{ marginTop: '20px' }}>
          <Button variant="secondary" onClick={regenerateTournament} className="btn-secondary">
            Regenerate Tournament
          </Button>
        </div>
      )}
    </div>
  );
};

export default Tournament;
