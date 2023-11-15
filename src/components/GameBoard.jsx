import { useState } from "react"


export const GameBoard = ({onSelectSquare, board}) => {

    

    //const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // si tu estado es un objeto o un array 
    // actualizes ese etqadao de forma inmutable 
    // lo que significa que crees una copia del estado antiguo
    // es decir primero un nuevo objeto o un nuevo arrat
    // y luego cambiarlo
    /*const handleSelectSquare = (rowIndex, colIndex) => {
        
        setGameBoard((prevGame) => {
            
            // nuevo array en memoria
            const updated = [...prevGame.map((innerArray => [...innerArray]))]

            updated[rowIndex][colIndex] = activePlayerSymbol

            return updated
        
        })
        
        onSelectSquare()

    }*/


    return (

        <ol id="game-board">

            {board.map((row, rowIndex) => 
            
                <li key={rowIndex}>

                    <ol>

                        {

                            row.map((playerSymbol, colIndex) => 
                            
                            <li key={colIndex}
                            
                            >
                                
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}
                            
                                >
                                    {playerSymbol}

                                </button>
                            
                            </li>
                    
                        )}

                    </ol>

                </li>
            
            )}

        </ol>
    )

}