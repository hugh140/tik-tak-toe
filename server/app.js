const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let playersList = [];
let serverTurn = Math.random() > 0.5 ? true : false;
let serverMatrix = Array(9).fill(null);
let serverWin = false;

io.on("connection", (socket) => {
  socket.on("connected", () => {
    playersList.push(socket.id);
    let playerMode = "spectator";

    if (socket.id === playersList[0]) playerMode = "×";
    else if (socket.id === playersList[1]) playerMode = "o";

    io.to(socket.id).emit("playerMode", playerMode);
    io.emit("matrix-turn-winner", { serverTurn, serverMatrix, serverWin });
  });

  socket.on("disconnect", () => {
    playersList.splice(playersList.indexOf(socket.id), 1);
  });

  socket.on("matrix-turn-winner", (data) => {
    serverMatrix = data.newMatrix;
    serverTurn = !data.turn;
    serverWin = data.detectVictory;
    io.emit("matrix-turn-winner", { serverMatrix, serverTurn, serverWin });
  });

  socket.on("reset-game", () => {
    serverMatrix = Array(9).fill(null);
    serverWin = false;
    serverTurn = Math.random() > 0.5 ? true : false;
    io.emit("matrix-turn-winner", { serverTurn, serverMatrix, serverWin });
  });
});

server.listen(3000, () => {
  console.log("Conectado en el puerto 3000");
});
