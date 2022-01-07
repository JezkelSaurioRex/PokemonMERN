import './Main.css';
import React from 'react';
import Menu from './Menu';
import Sound from 'react-sound';
import PokeMusic from './Musica/PokeMusic.mp3';
const urlBase = 'http://localhost:5000/';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: {}, mostrarPoke: false, modo: 'principal' };
  }

  async componentDidMount (){
    const url = urlBase + "pokemon/teams?equipo=" + this.props.equipo;
    fetch(url)
    .then((response) => response.json())
    .then(pokemones => {
        this.setState({ info: pokemones });
    });
  }
  //{console.log(this.state.info.pokemon[0])}

  render() {

    return (

      <body>
        {console.log(this.state.info)}
        <Sound
          url={PokeMusic}
          playStatus={Sound.status.PLAYING}
          playFromPosition={0}
          loop={true}
          volume={5}
        />
        <div>
          <br />
          { this.state.mostrarPoke && 
            <div>
              <Menu pokemon={this.state.info.pokemon} modo={this.state.modo} enBatalla={this.state.info.enBatalla}/>
            </div>
          }
          <br />
          <button className="botonEquipo" onClick={() => (this.setState({ mostrarPoke: true , modo: "principal"}))}>
            batalla
          </button>
          <button className="botonEquipo" onClick={() => (this.setState({ mostrarPoke: true , modo: "pokemon"}))}>
            equipo
          </button>
          <button className="botonEquipo" onClick={() => (this.setState({ mostrarPoke: true , modo: "stats"}))}>
            stats
          </button>
        </div>
      </body>
    );
  }
}

export default Main;