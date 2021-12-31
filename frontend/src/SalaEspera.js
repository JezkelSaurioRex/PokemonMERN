import React from "react";
import io from "socket.io-client";


class SalaEspera extends React.Component {
    constructor (props){
        super(props);
        this.state = {socket: null}
    }

    componentDidMount(){
        const socket = io("http://localhost:5000/");
        this.setState({socket: socket});
        socket.on("start", this.props.onStart);
    }

    componentWillUnmount(){
        const socket = this.state.socket;
        socket.close();
    }

    render(){
        return(
            <div>
                sala de espera
            </div>
        );
    }
}

export default SalaEspera;