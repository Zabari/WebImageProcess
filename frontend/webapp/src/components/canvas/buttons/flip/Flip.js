import React, {Component} from 'react';
import './Flip.css';

class Flip extends Component{

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
            <div class="Flip">
                <button onClick={this.onClick}>Flip Img</button>
            </div>
        );
    }

}

export default Flip;