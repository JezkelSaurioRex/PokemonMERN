import './Main.css';
import React from 'react';
import Pokemon from './Pokemon';
import Sound from 'react-sound';
import PokeMusic from './Musica/PokeMusic.mp3';
const urlBase = 'http://localhost:5000/';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemones: []};
    console.log(this.props.equipo);
  }

  equipo = async() =>{
    const url = urlBase + "pokemon/teams?equipo="+this.props.equipo;
    var equipo = await (await fetch(url)).json();
    let pokemones = equipo.pokemon.map(pokemon => 
      (<Pokemon pokemon={pokemon} 
      onStatsCombate={this.statsCombate.bind(this)}
      />));
    console.log(pokemones);
    this.setState({pokemones: pokemones});
  }

  statsCombate(stats, moves) {
    document.getElementById('statsTabla').innerHTML = stats.map(stat => 
      `<div>
        <b>${stat.stat.name}</b>
        <div>${stat.base_stat}</div>
        <br/>
      </div>`
    ).join('')

    document.getElementById('movesTabla').innerHTML = moves.map(move => 
      `<button>
        <b>${move.name}</b>
        <div>Power ${move.power}</div>
        <div>PP ${move.pp}</div>
        <br/>
      </button>`
    ).join('')
  }

  render() {
    return (   
      <body>
        <Sound
          url={PokeMusic}
          playStatus={Sound.status.PLAYING}
          playFromPosition={0}
          loop={true}
          volume={5}
        />
        <div id="div_equipos">       
          <ul id='pokesTabla'>
            {this.state.pokemones}
          </ul>
          <div>
            <h1>
              estadisticas
            </h1>
              <ul id='statsTabla' className='Tabla'/>     
          </div>
          <div>
            <h1>
              ataques
            </h1>
              <ul id='movesTabla' className='Tabla'/> 
          </div>    
        </div>
        <br/>
        <button className="botonEquipo" onClick={this.equipo}>
            equipo
        </button>
      </body>      
    );
  }
}

export default Main;