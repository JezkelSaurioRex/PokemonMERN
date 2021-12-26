import React from "react"
import "./Pokemon.css"

function Pokemon(props) {

    return (
    <li>
        {props.pokemon.name}
        <img id="sprites" src={props.pokemon.sprites.front_default}/>
    </li>
    )
}

export default Pokemon;