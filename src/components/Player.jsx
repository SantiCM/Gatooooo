import { useState } from "react"

export const Player = ( { initialName, symbol, isActive, onChangeName } ) => {

    const [playerName, setPlayerName] = useState(initialName)

    const [isEditing, setIsEditing] = useState(false)

    const handleEditClick = () => {
        
        // cuando actualizes el estado basandote en el valor 
        // anterior de este estado, debes pasar una funcion 
        // a esa funcion de actualizacion del estado en lugar

        setIsEditing((editing) => !editing)

        if(isEditing) {
        
            onChangeName(symbol, playerName)
            
        }

    }  

    const handleChange = (event) => {

        //event.preventDefault()
        
        setPlayerName(event.target.value)
        
    }

    let eitablePlayerName = <span className="player-name" onChange={handleChange}>{playerName}</span>

    //let btnCaption = "Edit"

    if(isEditing) {
    
        eitablePlayerName = <input type="text" required value={playerName} onChange={handleChange}></input>
    
    }

    //let btnCaption = "Save"

    return (
        
        <li className={isActive ? "active" :  undefined}>
            
            <span className="player">

                {eitablePlayerName }

                <span className="player-symbol">{symbol}</span>

                <button onClick={ handleEditClick }>{ isEditing ? "Save" : "Edit" }</button>

            </span>
            
        </li>
        
    )

}