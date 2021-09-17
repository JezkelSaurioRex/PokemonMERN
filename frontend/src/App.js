import logo from './logo.svg';
import './App.css';
import React from 'react';
import Tarea from './Tarea';
const urlBase = 'http://localhost:5000/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tareas: [{ nombre: "mariano", estado: "activo", id: 0}], nombre: "" ,filtro: "activo"}//el segundo nombre es el input
  }

  obtenerTareas() {
    var resultado = [];
    this.state.tareas.filter(t => t.estado === this.state.filtro || this.state.filtro === "").forEach(tarea => {
      resultado.push(
        <Tarea nombre={tarea.nombre} estado={tarea.estado} id = {tarea.id} onBorrarTarea = {this.borrarTarea.bind(this)} onCompletarTarea = {this.completarTarea.bind(this)}/>
      )
    });
    return resultado;
  }

  async llamar(){
    const url = urlBase + "pokemon/teams?equipo=1" ;
    var equipos = await(await fetch(url)).json();
    alert(equipos.pokemon[0].name);
  }

  borrarTarea(id){
    var borrado = this.state.tareas.filter(t => t.id == id)[0]
    var index = this.state.tareas.indexOf(borrado);
    this.state.tareas.splice(index,1);
    this.setState({tareas: this.state.tareas})
  }

  completarTarea(id){
    var completado = this.state.tareas.filter(t => t.id == id)[0]
    var index = this.state.tareas.indexOf(completado);
    this.state.tareas[index].estado = "completado"
    this.setState({tareas: this.state.tareas})
  }

  crearTarea(tareas, nombre) {   
    var tarea = { nombre: nombre, estado: "activo",id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 0 }
    tareas.push(tarea);
    this.setState({ tareas: tareas })
  }
  
  render() {
    return (
      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <div className="entrada">
          <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            onChange={e => { this.setState({ nombre: e.target.value }) }}
            value={this.state.nombre}
          />
          <button type="submit" className="btn btn__primary btn__lg" onClick={() => this.crearTarea(this.state.tareas, this.state.nombre)}>
            Add
          </button>
        </div>
        <div className="filters btn-group stack-exception">

          <button type="button" className="btn toggle-btn" aria-pressed="true" onClick={() => this.setState({filtro: "activo"})}>
            <span className="visually-hidden">Show </span>
            <span>Active</span>
            <span className="visually-hidden"> tasks</span>
          </button>
          <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={() => this.setState({filtro: "completado"})}>
            <span className="visually-hidden">Show </span>
            <span>Completed</span>
            <span className="visually-hidden"> tasks</span>
          </button>
          <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={() => this.setState({filtro: ""})}>
            <span className="visually-hidden">Show </span >
            <span>All</span>
            <span className="visually-hidden"> tasks</span>
          </button>
        </div>
        <h2 id="list-heading">
          {this.state.tareas.filter(t => t.estado === "activo").length} tasks remaining
        </h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {this.obtenerTareas()}
        </ul>
        <button onClick={this.llamar}>
          Llamar
        </button>
      </div>
    );
  }

}

export default App;