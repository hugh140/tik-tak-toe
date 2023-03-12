import { useState } from 'react'
import {Button, TurnIndicator, ResetButton} from './components/Components'
import victory from './victory'

function App() 
{
  const [matrix, setMatrix] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(Math.random() > 0.5 ? true : false)
  const [winner, setWinner] = useState(false)

  function playerTurn(index) {
    const newMatrix = [...matrix]
    if (newMatrix[index] || 
      winner || winner === null) return

    const symbol = turn ? '×' : 'o'
    newMatrix[index] = symbol

    setTurn(!turn)
    setMatrix(newMatrix)

    setWinner(victory(symbol, newMatrix))
  }

  function reset() {
    setMatrix(Array(9).fill(null))
    setWinner(false)
  }

  function VictoryMessage() {
    let text = null

    if (winner)
      text = 'Gana: ' + (!turn ? '×' : 'o').toUpperCase()
    else if (winner === null)
      text = 'Empate'

    return (
      <>
      {text}
      {!text ? null : <ResetButton click={reset} />}
      </>
    )
  }

  return (
  <>
  <h1>Tik Tak Toe</h1>
  <div className='center-matrix'>
    <TurnIndicator symbol='×' flash={turn} winner={winner && !turn} />
    <div className='matrix'>
    {
    matrix.map((symbol, index) => (
      <Button 
        key={index}
        index={index}
        symbol={matrix[index]}
        onClick={playerTurn}
      />
    ))
    }
    </div>
  <TurnIndicator symbol='o' flash={!turn} winner={winner && turn} />
  </div>
  <footer>
    <h3>
    <VictoryMessage />
    </h3>
  </footer>
  </>
  )
}

export default App