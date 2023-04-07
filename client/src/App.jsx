import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button, TurnIndicator, ResetButton } from "./Components";
import victory from "./victory";

const socket = io("http://localhost:3000");
socket.emit("connected");

function App() {
  const [matrix, setMatrix] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState();
  const [winner, setWinner] = useState(false);
  const [playerMode, setPlayerMode] = useState("");

  useEffect(() => {
    socket.on("playerMode", (data) => setPlayerMode(data));
    socket.on("matrix-turn-winner", (data) => {
      setTurn(data.serverTurn);
      setMatrix(data.serverMatrix);
      setWinner(data.serverWin);
    });
  }, []);

  function playerTurn(index) {
    const newMatrix = [...matrix];
    if (newMatrix[index] || winner || winner === null) return;

    const symbol = turn ? "×" : "o";

    newMatrix[index] = symbol;
    const detectVictory = victory(symbol, newMatrix);
    socket.emit("matrix-turn-winner", { newMatrix, turn, detectVictory });
  }

  function reset() {
    setMatrix(Array(9).fill(null));
    setWinner(false);
  }

  function disabledButtons() {
    const symbol = turn ? "×" : "o";
    console.log(symbol)

    if (playerMode !== "spectator" && playerMode === symbol) return false;
    return true;

  }

  function VictoryMessage() {
    let text = null;

    if (winner) text = "Gana: " + (!turn ? "×" : "o").toUpperCase();
    else if (winner === null) text = "Empate";

    return (
      <>
        {text}
        {!text ? null : <ResetButton click={reset} />}
      </>
    );
  }

  return (
    <>
      <h1>Tik Tak Toe</h1>
      <h3>You are: {playerMode}</h3>
      <div className="center-matrix">
        <TurnIndicator symbol="×" flash={turn} winner={winner && !turn} />
        <div className="matrix">
          {matrix.map((symbol, index) => (
            <Button
              key={index}
              index={index}
              symbol={matrix[index]}
              onClick={playerTurn}
              disabled={disabledButtons}
            />
          ))}
        </div>
        <TurnIndicator symbol="o" flash={!turn} winner={winner && turn} />
      </div>
      <footer>
        <h3>
          <VictoryMessage />
        </h3>
      </footer>
    </>
  );
}

export default App;
