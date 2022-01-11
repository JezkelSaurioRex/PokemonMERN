import './Main.css';
import React from 'react';
import Menu from './Menu';
import Sound from 'react-sound';
import PokeMusic from './Musica/PokeMusic.mp3';
import BotonesMenu from "./BotonesMenu";

const urlBase = 'http://localhost:5000/';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: {}, mostrarPoke: false };
  }

  async componentDidMount() {
    const url = urlBase + "pokemon/teams?equipo=" + this.props.equipo;
    fetch(url)
      .then((response) => response.json())
      .then(pokemones => {
        this.setState({ info: pokemones, mostrarPoke: true, opcion: "pelea" });
      });

  }
  //{console.log(this.state.info.pokemon[0])}

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
        <div>
          <br />
          {this.state.mostrarPoke &&
            <div>
              <Menu pokemon={this.state.info.pokemon} enBatalla={this.state.info.enBatalla} />
              <br />
              <button onClick={() => this.setState({ opcion: "pelea" })}>
                pelea
              </button>
              <button onClick={() => this.setState({ opcion: "cambio" })}>
                cambio
              </button>
              <button onClick={() => this.setState({ opcion: "curar" })}>
                curar
              </button>
              {this.state.opcion !== "" &&
                <div>
                  <BotonesMenu pokemon={this.state.info.pokemon} enBatalla={this.state.info.enBatalla} modo={this.state.opcion} />
                </div>
              }
            </div>
          }
          <br />
        </div>
      </body>
    );
  }
}

export default Main;