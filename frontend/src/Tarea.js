import React from "react"
import "./Tarea.css"

function Tarea(props) {
    return (
        <li className= "todo stack-small ">
            <div className={props.estado} >
                <label className="todo-label ">
                    {props.nombre}
                </label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn" onClick={() => props.onCompletarTarea(props.id)}>
                    Complete <span className="visually-hidden">Eat</span>
                </button>
                <button type="button" className="btn btn__danger" onClick={() => props.onBorrarTarea(props.id)}>
                    Delete <span className="visually-hidden">Eat</span >
                </button>
            </div>
        </li>
    );
}
export default Tarea;