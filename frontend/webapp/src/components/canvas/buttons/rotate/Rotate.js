import React, {Component} from 'react';
import './Rotate.css';

class Rotate extends Component{

    constructor(){
        super();
        this.state = {
            toggled : false,
            degrees : 0
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(e){
        let isToggled = this.state.toggled;
        let currentDegrees = this.state.degrees;
        this.setState({
            toggled : !isToggled,
            degrees : (currentDegrees + 90) % 360
        })
    }

    render(){
        return(
            <div className="Rotate">
                <button onClick={this.onClick}>Rotate Image</button>
                <label>Current rotation: {this.state.degrees}</label>
            </div>
        );
    }

}

export default Rotate;