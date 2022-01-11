import React from "react";

function BotonesMenu(props) {

    let result;
    let modo = props.modo;
    let pokemones = props.pokemon;
    let enBatalla = props.enBatalla;

    console.log(props);
    switch (modo) {
        case 'pelea':
            result = pokemones[enBatalla].moves.map(p =>
                <ul>
                    <button>
                        <b>{p.name}</b>
                        <div>Power {p.power}</div>
                        <div>PP {p.pp}</div>
                        <br />
                    </button>
                </ul>);
            break;
        case 'cambio':
            result = pokemones.map(p =>
                <ul>
                    <button>
                        <img alt="" src={p.sprites.front_default} />
                        {p.name}
                    </button>
                </ul>);
            break;
        case 'curar':
            result = pokemones[0].stats.map(p =>
                <ul>
                    <b>{p.stat.name}= {p.base_stat}</b>
                    <br />
                </ul>);
            break;
        default:
            result = (console.log("algo anda mal"));
            break;
    }

    return (
        <div>
            {result}
        </div>);

}

export default BotonesMenu;