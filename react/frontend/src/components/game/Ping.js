import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './css/Ping.css';
import kanimg from './assets/kan2.png';
import ballimg from './assets/ball.png';
import barimg from './assets/bar.png';

import { debounce } from 'lodash';


const GameBlock = ({gameInfo, bootid, winner, onWinnerChange, online}) => {
  console.log("GINFO :" + gameInfo.gameId);
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
  // const [bootid, setBootid] = useState(111);
  const [buttonClicked, setButtonClicked] = useState(false);

  // useEffect(() => {
  //   if (gameInfo2 && JSON.stringify(gameInfo2) !== JSON.stringify(gameInfo)) {
  //     setGameInfo(gameInfo2);
  //   }
  // }, [gameInfo2, gameInfo]);

  const handleWinnerChange = (newWinner) => {
    onWinnerChange(newWinner);
    console.log("Winner: " + newWinner);
  };

  useEffect(() => {
    const newSocket = io('http://' + process.env.REACT_APP_HOST_IP + ':4000');
    setSocket(newSocket);
    // startGame();
    // newSocket.emit("infos", gameInfo, gameInfo.gameId);
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
      // socket.emit("ballmove", clientId, gameInfo.gameId);
    }}, [ballposition]);

    useEffect(() => {
        if (scores.player1 > 3 || scores.player2 > 3) {
          handleWinnerChange(scores.player1 > 3? gameInfo.player1 : gameInfo.player2);
        }
      }, [scores]);
    
    
    useEffect(() => {
      if(socket && gameState && move){
        // console.log("move : " + ballposition);
        socket.emit("move", move, clientId, gameInfo.gameId);
        setMove(null);
      }}, [move]);

      useEffect(() => {
        if(socket && bootid == 111 && gameState){
          socket.emit("boot", bootid, gameInfo.gameId);
        }}, [ballposition]);

        useEffect(() => {
    
          window.addEventListener('keydown', onKeyDown);
          document.addEventListener("keydown", function(event) {
            event.preventDefault();
          });
          return () => {
            window.removeEventListener('keydown', onKeyDown);
          };
        }, []); 


        const startGame = () => {
			console.log(process.env.REACT_APP_HOST_IP);
          if(socket){
            // start(1);
            setGameState(true);
              // loop();
            setButtonClicked(true);
            socket.emit("startGame", gameInfo.gameId);
            // loop();
            // setGameState(true);
            // setButtonClicked(true);
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
              // boot(111);
            }
          }
        };
        const onKeyDown = (event) => {
          // console.log('Key pressed:', event.key);
          if (event.key === 'ArrowDown') setMove('down');
          else if (event.key === 'ArrowUp') setMove('up');
          if (event.key === 'w' || event.key === 'W') setMove('W');
          else if (event.key === 's' || event.key === 'S') setMove('S');
        };


        useEffect(() => {
          if (socket) {
            if (!buttonClicked && online && clientId == 1){
                startGame();
                // setButtonClicked(true);
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
              // console.log("GIDD", gid);
              // console.log("GIDD2", gameInfo.gameId);
              // console.log("data", data);
              // console.log("data2", data2);
              // console.log("data3", data3);
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
                // const canvas = context;
                // canvas.clearRect(data.x, data.y, 10, 10);
                // canvas.clearRect(0, 0, 10, 640);
                // canvas.clearRect(630, 0, 10, 640);
                // setCountdown(3);
                // startCountdown();
                // ddelay(3);
              }
            });
            socket.on("gameOver", (data, gid) => {
              if (gameInfo.gameId == gid) {
                stop();
                setBallposition(data);
                // const canvas = context;
                // canvas.clearRect(data.x, data.y, 10, 10);
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
              // window.addEventListener('keydown', onKeyDown);
              // document.addEventListener("keydown", function(event) {
              //   event.preventDefault();
              // });
              // return () => {
              //   window.removeEventListener('keydown', onKeyDown);
              // };
        });
      }
    }, [socket]);

    return (
      <div className="responsive-wrapper">
        {/* <div className="canvas-background"></div> */}

        <img id="ball" src={ballimg} style={{ display: 'none' }} />
        <img id="kan" src={kanimg} style={{ display: 'none' }} />
        <img id="line" src={barimg} style={{ display: 'none' }} />
        <canvas ref={(ref) => setContext(ref && ref.getContext('2d'))} width="640" height="480" style={{ border: '1px solid black' }}></canvas>
        <div class="result-display">
          <span>{gameInfo.player1} : {scores.player1} </span> | <span>{gameInfo.player2} : {scores.player2}</span>
        </div>
        {/* <div>
          {[...Array(12)].map((_, index) => (
            <p key={index}></p>
          ))}
        </div> */}
        {/* <button style={{ position: 'absolute', left: '46%', top: '91%' }} onClick={() => start(2)} disabled={scores.player1 <= 10 && scores.player2 <= 10}>
          Play Again
        </button> */}
        {!online && !buttonClicked && <button style={{ position: 'absolute', left: '46%', top: '91%' }} onClick={() => startGame()} disabled={scores.player1 !== 0 || scores.player2 !== 0 || buttonClicked}>
          Start
        </button>}
        {/* <div className="player-name" style={{ position: 'absolute', left: '30%', top: '0%' }}>
          {gameInfo.player1}
        </div>
        <div className="player-name" style={{ position: 'absolute', left: '55%', top: '0%' }}>
          {gameInfo.player2}
        </div>
        <div className="digital-number" style={{ position: 'absolute', left: '35%', top: '6%' }}>
          {scores.player1}
        </div>
        <div className="digital-number" style={{ position: 'absolute', left: '60%', top: '6%' }}>
          {scores.player2}
        </div> */}
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

