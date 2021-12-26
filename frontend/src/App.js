import './App.css';
import React from 'react';
import Pokemon from './Pokemon';
const urlBase = 'http://localhost:5000/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemones: []}
    this.equipo1 = this.equipo1.bind(this);
    this.equipo2 = this.equipo2.bind(this);
  }

  async equipo1() {
    const url = urlBase + "pokemon/teams?equipo=1";
    var equipo = await (await fetch(url)).json();
    let pokemones = equipo.pokemon.map(pokemon => (<Pokemon pokemon={pokemon}/>))
    console.log(pokemones);
    this.setState({pokemones: pokemones});
  }

  async equipo2() {
    const url = urlBase + "pokemon/teams?equipo=0";
    var equipo = await (await fetch(url)).json();
    let pokemones = equipo.pokemon.map(pokemon => (<Pokemon pokemon={pokemon}/>))
    console.log(pokemones);
    this.setState({pokemones: pokemones});
  }

  render() {
    return (
      <div className="todoapp stack-large">       
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {this.state.pokemones}
        </ul>
        <button onClick={this.equipo1}>
          equipo1
        </button>
        <button onClick={this.equipo2}>
          equipo2
        </button>
      </div>
    );
  }
}

export default App;