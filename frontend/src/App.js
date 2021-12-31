import React from "react";
import SalaEspera from "./SalaEspera";
import Main from "./Main";


//bandera para que vea si entra a la SE o al Main

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {start: false, equipo: -1};
    this.onStart = this.onStart.bind(this);
  }

  onStart(equipo){
    this.setState({start: true, equipo: equipo});
  }

  render(){
    return this.state.start?(<Main equipo={this.state.equipo}/>):(<SalaEspera onStart= {this.onStart}/>);
  }
}
export default App;