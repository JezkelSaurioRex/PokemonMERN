import './App.css';
import React from 'react';
import Pokemon from './Pokemon';
const urlBase = 'http://localhost:5000/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemones: [], estadisticas: []};
    this.equipo1 = this.equipo1.bind(this);
    this.equipo2 = this.equipo2.bind(this);
  }


  async equipo1() {
    const url = urlBase + "pokemon/teams?equipo=1";
    var equipo = await (await fetch(url)).json();
    let pokemones = equipo.pokemon.map(pokemon => (<Pokemon pokemon={pokemon} onStatsCombate={this.statsCombate.bind(this)}/>))
    console.log(pokemones);
    this.setState({pokemones: pokemones});
  }

  async equipo2() {
    const url = urlBase + "pokemon/teams?equipo=0";
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
      </div>`
    ).join('')
  }

  render() {
    return (
      <body>
        <div id="div_equipos">       
          <ul
            id='pokesTabla'
            aria-labelledby="list-heading"
          >
            {this.state.pokemones}
          </ul>          
        </div>
        <ul id='statsTabla'>
          <span>
            estadisticas
          </span>
            {this.state.estadisticas}
          </ul>
        <br/>
        <button className="botonEquipo" onClick={this.equipo1}>
            equipo 1
          </button>
          <button className="botonEquipo" onClick={this.equipo2}>
            equipo 2
          </button>
      </body>
      
    );
  }
}

export default App;