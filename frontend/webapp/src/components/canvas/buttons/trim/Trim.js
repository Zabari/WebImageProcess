import React, {Component} from 'react';
import './Trim.css';

class Trim extends Component{

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
        })
    }

    render(){
        return(
            <div className="Trim">
                <button onClick={this.onClick}>Trim Img</button>
            </div>
        );
    }

}

export default Trim;