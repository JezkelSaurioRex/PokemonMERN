import React from "react"

function Menu(props) {
    const result = (
        <div>
            {<img alt="" className="PenCampo" src={props.pokemon[props.enBatalla].sprites.back_default} />}
        </div>);

    return result;
}

export default Menu;