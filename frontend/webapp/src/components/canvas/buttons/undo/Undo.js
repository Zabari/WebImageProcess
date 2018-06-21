import React, {Component} from 'react';
import './Undo.css';

class Undo extends Component{

    constructor(){
        super();
        this.state = {
            toggled : false,
            
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(e){
        let isToggled = this.state.toggled;
        this.setState({
            toggled : !isToggled
        }, () =>
        this.props.callback(this.state.toggled));
    }

    render(){
        return(
            <div className="Undo">
                <button onClick={this.onClick}>Undo</button>
            </div>
        );
    }

}

export default Undo;