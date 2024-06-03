import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './css/Ping.css';
import kanimg from './assets/kan2.png';
import ballimg from './assets/ball.png';
import barimg from './assets/bar.png';

import { debounce } from 'lodash';


const GameBlock = ({gameInfo, bootid, winner, onWinnerChange, online}) => {
  const [countdown, setCountdown] = useState(0);
  const [move, setMove] = useState(null);
  const [infos, setInfos] = useState(0);
  const [socket, setSocket] = useState(null);
  const [context, setContext] = useState(null);
  const [position, setPosition] = useState({ lx: 0, ly: 180, x: 0, y: 180 });
  const [oposition, setOposition] = useState({ lx: 630, ly: 180, x: 630, y: 180 });
  const [ballposition, setBallposition] = useState({ lx: 320, ly: 240, x: 320, y: 240 });
  const [gameState, setGameState] = useState(true);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [lastpl, setLastpl] = useState(1);
  const [intervalId, setIntervalId] = useState(null);
  const [clientId, setClientId] = useState(gameInfo.playerId);
  const [buttonClicked, setButtonClicked] = useState(false);


  const handleWinnerChange = (newWinner) => {
    onWinnerChange(newWinner);
  };

  useEffect(() => {
	var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":4000"
    // const newSocket = io('https://' + process.env.REACT_APP_HOST_IP + ':4000');
    const newSocket = io(URL);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (context) {
      context.clearRect(position.lx, position.ly, 10, 120);
      context.drawImage(document.getElementById('kan'), position.x, position.y, 10, 120);
      context.clearRect(oposition.lx, oposition.ly, 10, 120);
      context.drawImage(document.getElementById('kan'), oposition.x, oposition.y, 10, 120);
      context.clearRect(ballposition.lx, ballposition.ly, 10, 10);
      context.drawImage(document.getElementById('ball'), ballposition.x, ballposition.y, 10, 10);
    }
  }, [context, position, oposition, ballposition]);

  const debouncedEmitBallMove = debounce((clientId, gameId) => {
    socket.emit("ballmove", clientId, gameId, online);
  }, 20);


  useEffect(() => {
    if(socket && gameState){
      debouncedEmitBallMove(clientId, gameInfo.gameId);
    }}, [ballposition]);

    useEffect(() => {
        if (scores.player1 > 3 || scores.player2 > 3) {
          handleWinnerChange(scores.player1 > 3? gameInfo.player1 : gameInfo.player2);
        }
      }, [scores]);
    
    
    useEffect(() => {
      if(socket && gameState && move){
        socket.emit("move", move, clientId, gameInfo.gameId);
        setMove(null);
      }}, [move]);

      useEffect(() => {
        if(socket && bootid == 111 && gameState){
          socket.emit("boot", bootid, gameInfo.gameId);
        }}, [ballposition]);

        const preventDefault = (event) => {
          event.preventDefault();
        };

        useEffect(() => {
    
          window.addEventListener('keydown', onKeyDown);
          document.addEventListener('keydown', preventDefault);
          return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keydown', preventDefault);
          };
        }, []); 


        const startGame = () => {
			// console.log(process.env.REACT_APP_HOST_IP);
          if(socket){
            setGameState(true);
            setButtonClicked(true);
            socket.emit("startGame", gameInfo.gameId);
          }};
        const loop = () => {
          if (gameState) requestAnimationFrame(loop);
        };
        const stop = () => {
          setGameState(false);
          setButtonClicked(false);
        };
        const start = (num) => {
          if (gameInfo.gameId > 0 && num === 2) stop();
          if (clientId <= 1) {
            if (num === 2) {
              stop();
              socket.emit("startAgain", clientId, gameInfo.gameId);
              setScores({ player1: 0, player2: 0 });
              start(1);
            } else {
              stop();
              setGameState(true);
              loop();
              setButtonClicked(true);
            }
          }
        };
        const onKeyDown = (event) => {
          if (event.key === 'ArrowDown') setMove('down');
          else if (event.key === 'ArrowUp') setMove('up');
          if (event.key === 'w' || event.key === 'W') setMove('W');
          else if (event.key === 's' || event.key === 'S') setMove('S');
        };


        useEffect(() => {
          if (socket) {
            if (!buttonClicked && online && clientId == 1){
                startGame();
            }
            // /Emit/ //
            socket.emit("infos", gameInfo, gameInfo.gameId);

            // /Listen/ //
            socket.on("startGame", (data, gid) => {
              if (gameInfo.gameId == data && clientId == 1) {
                startGame();
              }
            });
            socket.on("ballposition", (data, data2, data3, gid) => {
              if (gameInfo.gameId == gid) {
                setBallposition(data);
                setPosition(data2);
                setOposition(data3);
              }
            });
            socket.on('updateScores', (data, gid) => {
              if (gameInfo.gameId == gid) {
                setScores(data);
              }
            });
            socket.on("lose", (data, data2, data3, gid) => {
              if (gameInfo.gameId === gid) {
                setBallposition(data);
                setPosition(data2);
                setOposition(data3);
              }
            });
            socket.on("gameOver", (data, gid) => {
              if (gameInfo.gameId == gid) {
                stop();
                setBallposition(data);
              }
            });
            socket.on("dataup", (data1, data2, gid) => {
              if (gameInfo.gameId == gid) {
                if (clientId === 0) {
                  setPosition(data1);
                  setOposition(data2);
                } else {
                  setPosition(data2);
                  setOposition(data1);
                }
              }
        });
      }
    }, [socket]);

    return (
      <div className="responsive-wrapper">

        <img id="ball" src={ballimg} style={{ display: 'none' }} />
        <img id="kan" src={kanimg} style={{ display: 'none' }} />
        <img id="line" src={barimg} style={{ display: 'none' }} />
        <canvas ref={(ref) => setContext(ref && ref.getContext('2d'))} width="640" height="480" style={{ border: '1px solid black' }}></canvas>
        <div class="result-display">
          <span>{gameInfo.player1} : {scores.player1} </span> | <span>{gameInfo.player2} : {scores.player2}</span>
        </div>
        {!online && !buttonClicked && <button style={{ position: 'absolute', left: '46%', top: '91%' }} onClick={() => startGame()} disabled={scores.player1 !== 0 || scores.player2 !== 0 || buttonClicked}>
          Start
        </button>}
        {scores.player2 > 10 && <div className="Winner" style={{ position: 'absolute', left: '37%', top: '37%' }}>{gameInfo.player2}</div>}
        {scores.player1 > 10 && <div className="Winner" style={{ position: 'absolute', left: '37%', top: '37%' }}>{gameInfo.player1}</div>}
        {(scores.player1 > 10 || scores.player2 > 10) && <div className="Win" style={{ position: 'absolute', left: '33%', top: '46%' }}>WIN</div>}
        <div className="Win" style={{ position: 'absolute', left: '45%', top: '46%' }}>
          <p>{countdown > 0 && countdown}</p>
        </div>
      </div>
    );
    return socket;
  };
  export default GameBlock;

