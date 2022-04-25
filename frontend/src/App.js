import React from "react";
import SalaEspera from "./SalaEspera";
import Main from "./Main";
import io from "socket.io-client";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {start: false, equipo: -1, socket: null};
    this.onStart = this.onStart.bind(this);
  }

  componentDidMount(){
    const socket = io("http://localhost:5000/");
    this.setState({socket: socket});
    socket.on("start", this.onStart);
  }

  componentWillUnmount(){
      const socket = this.state.socket;
      socket.close();
  }

  onStart(equipo){
    this.setState({start: true, equipo: equipo});
  }

  render(){
    return this.state.start?(<Main equipo={this.state.equipo} socket={this.state.socket}/>):(<SalaEspera/>);
  }
}
export default App;