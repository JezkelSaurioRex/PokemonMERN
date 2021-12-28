import React from "react"
import "./Pokemon.css"

function Pokemon(props) {

    return (
    <li>
        <button id="botonPKM" onClick={() => props.onStatsCombate(props.pokemon.stats)}>
        <div className="btnTXT" >{props.pokemon.name}</div>
        <img alt="" className="sprites" src={props.pokemon.sprites.front_default}/>
        </button>
    </li>
    )
}


export default Pokemon;