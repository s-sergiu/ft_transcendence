let waitingPlayer = null;
const privateGames = {};
let users = {};
const port = 4000;
const host = "0.0.0.0";
var id = 0;
createIndex = 0;
const ballVelocity = 10;
const barVelocity = 30;
var bootVelocity = 22.5;
const express = require('express');
const https = require(process.env.HTTP_METHOD);
const fs = require('fs');
const socketIo = require('socket.io');
const cors = require('cors');
const { create } = require('domain');

const app = express();
var options;
var server;
if (process.env.HTTP_METHOD === 'https') {
	options = {
		path: "/socket.io",
		key: fs.readFileSync('./private-key.pem'),
		cert: fs.readFileSync('./certificate.pem'),
	  };
	server = https.createServer(options, app);
} else {
	server = https.createServer(app);
}
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
// 		origin: "https://" + process.env.HOST_IP,
//     }
// });
const io = socketIo(server, {
    cors: {
      origin: (origin, callback) => {
        // Allow requests from specific origins
        // if (origin === "http://" + process.env.HOST_IP || origin === "https://" + process.env.HOST_IP ||origin === "https://" + process.env.HOST_IP + port || origin === "https://" + process.env.HOST_NAME) {
          callback(null, true);
    //     } else {
    //       callback(new Error('Not allowed by CORS'));
    //     }
      },
      credentials: true
    }
  });
  

// app.use(cors({ origin: "https://" + process.env.HOST_IP }));
app.use(cors({
    origin: (origin, callback) => {
        // if (origin === "http://" + process.env.HOST_IP || origin === "https://" + process.env.HOST_IP ||origin === "https://" + process.env.HOST_IP + port || origin === "https://" + process.env.HOST_NAME) {
        callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    },
    credentials: true
  }));


GameData = {
    gameInfo : {
        player1: "null",
        player2: "null",
        gameId: 77,
        playerId: 77
    },
    positions : {
        lx: 0,
        ly: 180,
        x: 0,
        y: 180
    },
    positions2 : {
        lx: 630,
        ly: 180,
        x: 630,
        y: 180
    },
    ballpositions0 : {
        lx: 330,
        ly: 230,
        x: 320,
        y: 240
    },
    ballpositions : {
        lx: 330,
        ly: 230,
        x: 320,
        y: 240
    },
    scores : {
        player1: 0,
        player2: 0
    },
    directionX : Math.random() < 0.5 ? 1 : -1,
    directionY : Math.random() < 0.5 ? 1 : -1,
    velocityPercent : 0
}

const GamesList = [];

function ballpositionTo_0() {
    GamesList[id].velocityPercent = 0;
    GamesList[id].ballpositions.x =  320;
    GamesList[id].ballpositions.y =  240;
    GamesList[id].positions.x = 0;
    GamesList[id].positions.y = 180;
    GamesList[id].positions2.x = 630;
    GamesList[id].positions2.y = 180;

}

function definePercent()
{
    if (GamesList[id].ballpositions.x <= ballVelocity)
        GamesList[id].velocityPercent = ((GamesList[id].positions.y + 60) - GamesList[id].ballpositions.y) / 60;
    else
        GamesList[id].velocityPercent = ((GamesList[id].positions2.y + 60) - GamesList[id].ballpositions.y) / 60;

}

function createGame()
{
    for (let i = 0; i < 999; i++) {
        const GameData2 = JSON.parse(JSON.stringify(GameData));
        GameData2.gameInfo.gameId = i;
        GamesList.push(GameData2);
    }
}

function fetchIt()
{
    fetch('https://api.jsonbin.io/v3/b/66283eb1acd3cb34a83d4a99')
    .then(response => response.json())
    .then(data => {
        i = 0;
            const gid = data.record;
        if (GamesList[i].gameInfo.gameId == gid.gameId)
        {
            if (GamesList[i].gameInfo.playerId != gid.playerId)
            GamesList[i].gameInfo.playerId = gid.playerId;
    }
            GamesList[i].gameInfo.player1 = gid.player1;
            GamesList[i].gameInfo.player2 = gid.player2;
            GamesList[i].gameInfo.gameId = gid.gameId;
            id = gid.gameId;
            GamesList[i].gameInfo.playerId = gid.playerId;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

const findGameByEmail = (emailToFind) => {
    const foundEntry = Object.entries(privateGames).find(
      ([key, value]) => value.email === emailToFind
    );
    return foundEntry ? { id: foundEntry[0], ...foundEntry[1] } : null;
  };

function sendDataToBend(data) {
    const dataToSend = {
        gameId: GamesList[id].gameInfo.gameId,
        player1name: GamesList[id].gameInfo.player1,
        player2name: GamesList[id].gameInfo.player2,
        pl1score: GamesList[id].scores.player1,
        pl2score: GamesList[id].scores.player2,
        winner: data,
    };

    fetch('https://api.jsonbin.io/v3/b/662836ccad19ca34f85ed165', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "X-Master-Key": "$2a$10$9XX6agrspLUprUgWtjVROeWSmZaAcjqzPv.m1LexRk.UR2gEskb4m"
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send data');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error sending data', error);
    });
}


server.listen(port,host, () => {
    console.log("Listening at :4000...");
});

io.on("connection", (socket) => {
        createGame();
    socket.on("infos", (data, gid) => {
        id = gid;
        GamesList[gid].gameInfo.player1 = data.player1;
        GamesList[gid].gameInfo.player2 = data.player2;
        GamesList[gid].gameInfo.playerId = data.playerId;
        GamesList[gid].gameInfo.gameId = data.gameId;
        });
        socket.emit('message', 'You are connected! ' + GamesList[id].gameInfo.player1, id);
        socket.emit("dataup", GamesList[id].positions, GamesList[id].positions2, GamesList[id].gameId);
        socket.on("stop", (data, gid) => {
        id = gid;
    });
    socket.on("startAgain", (data, gid) => {
        id = gid;
        ballpositionTo_0();
        io.emit("ballposition", GamesList[id].ballpositions, GamesList[id].positions, GamesList[id].positions2, GamesList[id].gameId);
    });
    socket.on("reset", gid => {
        id = gid;
        ballpositionTo_0();
        GamesList[id].scores.player1 = 0;
        GamesList[id].scores.player2 = 0;
        socket.emit("updateScores", GamesList[id].scores, id);
        io.emit("ballposition", GamesList[id].ballpositions, GamesList[id].positions, GamesList[id].positions2, GamesList[id].gameId);
        io.emit("gameOver", GamesList[id].ballpositions0, id);
    });
    socket.on("startGame", gid => {
        id = gid;
        ballpositionTo_0();
        GamesList[id].scores.player1 = 0;
        GamesList[id].scores.player2 = 0;
        socket.emit("updateScores", GamesList[id].scores, id);
        io.emit("ballposition", GamesList[id].ballpositions, GamesList[id].positions, GamesList[id].positions2, id);
    });
    socket.on("move", (data, playerId, gid) => {
        id = gid;
        if (playerId == 0 && id < 500)
        {
            GamesList[id].positions2.ly = GamesList[id].positions2.y;
            GamesList[id].positions.ly = GamesList[id].positions.y;
                if (data) {
                    if (data == "W"){
                        if (GamesList[id].positions.y > 0)
                        {
                            GamesList[id].positions.ly = GamesList[id].positions.y;
                            GamesList[id].positions.y -= barVelocity;
                        }
                            io.emit("dataup", GamesList[id].positions, GamesList[id].positions2, id);
                        }
                    if (data == "S"){
                        if (GamesList[id].positions.y < 360)
                        {
                            GamesList[id].positions.ly = GamesList[id].positions.y;
                            GamesList[id].positions.y += barVelocity;
                        }
                            io.emit("dataup", GamesList[id].positions, GamesList[id].positions2, id);
                        }
                    if (data == "up"){
                        if (GamesList[id].positions2.y > 0)
                        GamesList[id].positions2.y -= barVelocity;
                        io.emit("dataup", GamesList[id].positions, GamesList[id].positions2, id);
                    }
                    if (data == "down"){
                        if (GamesList[id].positions2.y < 360)
                        GamesList[id].positions2.y += barVelocity;
                        io.emit("dataup", GamesList[id].positions, GamesList[id].positions2, id);
                    }
                    }
        }
        else if (playerId == 1)
            {
                switch(data) {
                case "up":
                    if (GamesList[id].positions.y > 0)
                    {
                        GamesList[id].positions.ly = GamesList[id].positions.y;
                        GamesList[id].positions.y -= barVelocity;
                    }
                        io.emit("dataup", GamesList[id].positions, GamesList[id].positions2, id);
                        break;
                case "down":
                    if (GamesList[id].positions.y < 360)
                    {
                        GamesList[id].positions.ly = GamesList[id].positions.y;
                        GamesList[id].positions.y += barVelocity;
                    }
                        io.emit("dataup", GamesList[id].positions, GamesList[id].positions2, id);
                        break;
                }
            }
        else if (playerId == 2)
        {
            GamesList[id].positions2.ly = GamesList[id].positions2.y;
                switch(data) {
                case "up":
                    if (GamesList[id].positions2.y > 0)
                    GamesList[id].positions2.y -= barVelocity;
                    io.emit("dataup", GamesList[id].positions, GamesList[id].positions2, id);
                    break;
                case "down":
                    if (GamesList[id].positions2.y < 360)
                    GamesList[id].positions2.y += barVelocity;
                    io.emit("dataup", GamesList[id].positions, GamesList[id].positions2, id);
                    break;
                }
        }
        

    });
    socket.on("boot", (data, gid) => {
        id = gid;
        bootVelocity = Math.floor(Math.random() * 4) + 19;
                if (GamesList[id].ballpositions.y < GamesList[id].positions2.y && GamesList[id].positions2.y > 0)
                    {
                    GamesList[id].positions2.ly = GamesList[id].positions2.y;
                    GamesList[id].positions2.y -= barVelocity - bootVelocity;
                }
                    else if (GamesList[id].ballpositions.y > GamesList[id].positions2.y + 100 && GamesList[id].positions2.y < 360)
                {
                    GamesList[id].positions2.ly = GamesList[id].positions2.y;
                    GamesList[id].positions2.y += barVelocity - bootVelocity;
                }
                    io.emit("dataup", GamesList[id].positions, GamesList[id].positions2, id);
    });
    socket.on("ballmove", (data, gid, online) => {
            id = gid;
            if ((online && data == 1) || !online){
            if(GamesList[id].ballpositions.x <= ballVelocity && (GamesList[id].ballpositions.y < GamesList[id]. positions.y || GamesList[id].ballpositions.y > GamesList[id].positions.y + 120))
                {
                    io.emit("message", "Player 1 lose");
                    GamesList[id].scores.player2++;
                    io.emit('updateScores', GamesList[id].scores, id);
                    if(GamesList[id].scores.player1 < 11 && GamesList[id].scores.player2 < 11){
                    GamesList[id].ballpositions.lx = GamesList[id].ballpositions.x;
                    GamesList[id].ballpositions.ly = GamesList[id].ballpositions.y;
                    GamesList[id].positions.lx = GamesList[id].positions.x;
                    GamesList[id].positions.ly = GamesList[id].positions.y;
                    GamesList[id].positions2.lx = GamesList[id].positions2.x;
                    GamesList[id].positions2.ly = GamesList[id].positions2.y;
                    ballpositionTo_0();
                    io.emit("ballposition", GamesList[id].ballpositions, GamesList[id].positions, GamesList[id].positions2, id);
                    }
                }
            else if(GamesList[id].ballpositions.x >= 640 - ballVelocity && (GamesList[id].ballpositions.y < GamesList[id].positions2.y || GamesList[id].ballpositions.y > GamesList[id].positions2.y + 120))
                {
                    io.emit("message", "Player 2 lose");
                    GamesList[id].scores.player1++;
                    io.emit('updateScores', GamesList[id].scores, id);
                    if(GamesList[id].scores.player1 < 11 && GamesList[id].scores.player2 < 11){
                        GamesList[id].ballpositions.lx = GamesList[id].ballpositions.x;
                        GamesList[id].ballpositions.ly = GamesList[id].ballpositions.y;
                        GamesList[id].positions.lx = GamesList[id].positions.x;
                        GamesList[id].positions.ly = GamesList[id].positions.y;
                        GamesList[id].positions2.lx = GamesList[id].positions2.x;
                        GamesList[id].positions2.ly = GamesList[id].positions2.y;
                        ballpositionTo_0();
                        io.emit("ballposition", GamesList[id].ballpositions, GamesList[id].positions, GamesList[id].positions2, id);
                    }
                }
                else{
            if(GamesList[id].scores.player1 > 10 || GamesList[id].scores.player2 > 10)
                {
                    if (GamesList[id].scores.player1 > 10 && GamesList[id].gameId > 0)
                        sendDataToBend(GamesList[id].gameInfo.player1);
                    else
                        sendDataToBend(GamesList[id].gameInfo.player2);
                    io.emit('updateScores', GamesList[id].scores, id);
                    io.emit("gameOver", GamesList[id].ballpositions0, id);
                    GamesList[id].scores.player1 = 0;
                    GamesList[id].scores.player2 = 0;
                }
            if(GamesList[id].ballpositions.x <= ballVelocity || GamesList[id].ballpositions.x >= 640 - ballVelocity)
            {
                definePercent();
                GamesList[id].directionX *= -1;
            }
            if(GamesList[id].ballpositions.y <= ballVelocity || GamesList[id].ballpositions.y >= 480 - ballVelocity)
                GamesList[id].directionY *= -1;
            GamesList[id].ballpositions.lx = GamesList[id].ballpositions.x;
            GamesList[id].ballpositions.ly = GamesList[id].ballpositions.y;
            GamesList[id].ballpositions.x += ballVelocity * GamesList[id].directionX;
            GamesList[id].ballpositions.y += ballVelocity * GamesList[id].directionY * GamesList[id].velocityPercent;
            io.emit("ballposition", GamesList[id].ballpositions, GamesList[id].positions, GamesList[id].positions2, id);}
            }});
            socket.on('join', ({ userId }) => {
                console.log("socket id :" +socket.id);
                users[socket.id] = userId;
                console.log(`User ${userId} connected with ID: ${socket.id}`);
              });
            
              socket.on('send-message', (message) => {
                console.log('message: ', message);
                const { contactId, ...msg } = message;
                const recipientSocketId = Object.keys(users).find(key => users[key] === contactId);
                if (recipientSocketId) {
                  io.to(recipientSocketId).emit('new-message', msg);
                }
              });



              socket.on('startRandomGame', ({ playerName }) => {
                if (waitingPlayer) {
                  // Match found
                  const gameId = Math.floor(Math.random(150) * 800).toString();
                  const gameInfo = {
                    gameId,
                    player1: waitingPlayer.playerName,
                    player2: playerName,
                    playerId: 2,
                  };
                  socket.emit('randomMatch', { ...gameInfo, playerId: 2 });
                  waitingPlayer.socket.emit('randomMatch', { ...gameInfo, playerId: 1 });
                  waitingPlayer = null;
                } else {
                  waitingPlayer = { socket, playerName };
                  socket.emit('waiting', { message: 'Waiting for another player...' });
                }
              });
            
              socket.on('createPrivateGame', ({ gameId, playerName }) => {
                privateGames[gameId] = { player1: playerName, socket };
                socket.emit('privateGameCreated', { gameId, message: `Private game created with ID: ${gameId}` });
              });

              socket.on('createFriendGame', ({ email, gameId, playerName }) => {
                privateGames[gameId] = { player1: playerName, socket, email, gameId };
              });
            
              socket.on('joinPrivateGame', ({ gameId, playerName }) => {
                const game = privateGames[gameId];
                if (game) {
                  const gameInfo = {
                    gameId,
                    player1: game.player1,
                    player2: playerName,
                    playerId: 2,
                  };
                  socket.emit('privateMatch', { ...gameInfo, playerId: 2 });
                  game.socket.emit('privateMatch', { ...gameInfo, playerId: 1 });
                  delete privateGames[gameId];
                } else {
                  socket.emit('error', { message: 'Invalid Game ID' });
                  socket.emit('GameNotFound', { gameId, message: 'Game not found' });
                }
              });

              socket.on('joinFriendGame', ({ email, playerName }) => {
                const game= findGameByEmail(email);
                    if (game) {
                        const gameInfo = {
                            gameId : game.gameId,
                            player1: game.player1,
                            player2: playerName,
                            playerId: 2,
                        };
                  socket.emit('InviteMatch', { ...gameInfo, playerId: 2 });
                  game.socket.emit('InviteMatch', { ...gameInfo, playerId: 1 });
                  delete privateGames[gameInfo.gameId];
                } else {
                  socket.emit('error', { message: 'Invalid Game ID' });
                }
              });

            
              socket.on('disconnect', () => {
                console.log('user disconnected:', socket.id);
                delete users[socket.id];
              });
    });
