const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
  },
});

let playersList = [];
let serverTurn = Math.random() > 0.5 ? true : false
let serverMatrix = Array(9).fill(null)

io.on("connection", (socket) => {
  socket.on("connected", () => {
    playersList.push(socket.id);
    let playerMode = "Spectator";

    if (socket.id === playersList[0]) playerMode = "Player X";
    else if (socket.id === playersList[1]) playerMode = "Player O";

    io.to(socket.id).emit("playerMode", playerMode);
    io.emit("matrix-turn", {serverTurn, serverMatrix})
  });

  socket.on("disconnect", () => {
    playersList.splice(playersList.indexOf(socket.id), 1);
  });

  socket.on('matrix-turn', data => {
    serverMatrix = data.newMatrix
    serverTurn = data.turn
    io.emit('matrix-turn', {serverMatrix, serverTurn})
  })
});

server.listen(3000, () => {
  console.log("Conectado en el puerto 3000");
});
