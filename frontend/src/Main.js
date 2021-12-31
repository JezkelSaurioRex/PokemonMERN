import './App.css';
import React from 'react';
import Pokemon from './Pokemon';
import Sound from 'react-sound';
import PokeMusic from './Musica/PokeMusic.mp3';
const urlBase = 'http://localhost:5000/';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemones: [], estadisticas: []};
    this.equipo = this.equipo.bind(this);
    console.log(this.props.equipo);
  }


  async equipo() {
    const url = urlBase + "pokemon/teams?equipo="+this.props.equipo;
    var equipo = await (await fetch(url)).json();
    let pokemones = equipo.pokemon.map(pokemon => (<Pokemon pokemon={pokemon} onStatsCombate={this.statsCombate.bind(this)}/>))
    console.log(pokemones);
    this.setState({pokemones: pokemones});
  }

  statsCombate(stats) {
    document.getElementById('statsTabla').innerHTML = stats.map(stat => 
      `<div>
        <div>${stat.stat.name}</div>
        <div>${stat.base_stat}</div>
        <br/>
      </div>`
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
            <ul id='statsTabla'>
              {this.state.estadisticas}
            </ul>     
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