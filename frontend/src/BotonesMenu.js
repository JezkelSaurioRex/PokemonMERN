import React from "react";

function BotonesMenu(props) {

    let result;
    let { modo, pokemon, enBatalla, socket, equipo } = props;

    switch (modo) {
        case 'pelea':
            result = pokemon[enBatalla].moves.map((p, index) =>
                <ul>
                    <button onClick={() => {
                        console.log(equipo);
                        socket.emit('accion', { team: equipo, accion: "ataque", ataque: index })
                    }}>
                        <b>{p.name}</b>
                        <div>Power {p.power}</div>
                        <div>PP {p.pp}</div>
                        <br />
                    </button>
                </ul>
            );
            break;
        case 'cambio':
            result = pokemon.map(p =>
                <ul>
                    <button>
                        <img alt="" src={p.sprites.front_default} />
                        {p.name}
                    </button>
                </ul>);
            break;
        case 'curar':
            result = pokemon[0].stats.map(p =>
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