import { useState } from "react"
import { GameBoard } from "./components/GameBoard"
import { Player } from "./components/Player"
import { Log } from "./components/Log"
import { WINNING_COMBINATTIONS } from "./winning_combinattions"
import { GameOver } from "./components/GameOver"

const PLAYERS = {

  "X" : "Player 1",

  "0" : "Player 2"

}


const INITIAL_GAME_BOARD = [

  [null, null, null],

  [null, null, null],

  [null, null, null],

]

const deriveActivePlayer = (gameTurns) => {
    
  let currentPlayer = "X"

  if(gameTurns.length > 0 && gameTurns[0].player === "X") {
      
    currentPlayer = "O"
    
  }

  return currentPlayer

} 

const deriveGameBoard = (gameTurns) => {
   
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]

  for(const turn of gameTurns) {
    
    const {square, player} = turn

    const {row, col} = square

    gameBoard[row][col] = player
    
  }

  return gameBoard


}

const deriveWinner = (gameBoard, players) => {

  let winner 

  for(const combination of WINNING_COMBINATTIONS) {
    
    const firstSquaresSymbol = gameBoard[combination[0].row][combination[0].column]

    const secondSquaresSymbol =  gameBoard[combination[1].row][combination[1].column]

    const thirdSquaresSymbol =  gameBoard[combination[2].row][combination[2].column]
    
    if(firstSquaresSymbol && firstSquaresSymbol === secondSquaresSymbol && firstSquaresSymbol === thirdSquaresSymbol) {
      
      winner = players[firstSquaresSymbol]
    
    }

  }

  return winner

}


const App = () => {

  const [players, setPlayers] = useState(PLAYERS)

  const [gameTurns, setGameTurns] = useState([])

  //const [hasWinner, setHasWinner] = useState(false)

  //const [activePlayer, setAtivePlayer] = useState("X")

  const activePlayer = deriveActivePlayer(gameTurns)

  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players)

  
  const hasDrow = gameTurns.length === 9 && !winner

  const handleSelectSquare = (rowIndex, colIndex) => {
  
    //setAtivePlayer((curActive) => curActive === "X" ? "O" : "X")

    // inmutable
    setGameTurns(prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns)

      const updated = [ { square: {row: rowIndex, col: colIndex}, player: activePlayer } ,
      
        ...prevTurns
      
      ]

      return updated
    
    })
  
  }

  const handleRestart = () => {
    
    setGameTurns([])
  
  }

  const handlePlayerNameChange = (symbol, newName) => {
    
    setPlayers(prevPlayers => {
    
      return {
      
        ...prevPlayers,

        [symbol] : newName
      
      }
    
    })
  
  }

  return (
    
    <main>

      <div id="game-container">

        <ol id="players" className="highlight-player">

          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}></Player>

          <Player initialName={PLAYERS.O} symbol="0" isActive={activePlayer === "O"}  onChangeName={handlePlayerNameChange}></Player>

        </ol>

        {(winner || hasDrow) && <GameOver onRestart={handleRestart} winner={winner}></GameOver>}

        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} board={gameBoard}></GameBoard>

      </div>

      <Log turns={gameTurns}></Log>

    </main>
    
  )

}

export default App
