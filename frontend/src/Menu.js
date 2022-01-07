import React from "react"

function Menu(props) {

    const getBotones = (pokemon, modo) => {
        let result;
        console.log(pokemon)
        switch (modo) {
            case 'principal':
                result = (
                    <div>
                        {<img alt="" className="PenCampo" src={pokemon[props.enBatalla].sprites.back_default} />}
                    </div>);
                break;
            case 'pokemon':
                result = pokemon.moves.map (p => 
                    <li>
                        <button>
                            <b>{p.name}</b>
                            <div>Power {p.power}</div>
                            <div>PP {p.pp}</div>
                            <br />
                        </button>
                    </li>);
                break;
            case 'stats':
                result = pokemon.stats.map(p =>
                    <li>
                        <b>{p.stat.name}= </b>
                        <div>{p.base_stat}</div>
                        <br />
                    </li>);
                break;
            default:
                break;
        }
        return result;

    }

    return (
        <div>{getBotones(props.pokemon, props.modo)}</div>
    );
}

export default Menu;