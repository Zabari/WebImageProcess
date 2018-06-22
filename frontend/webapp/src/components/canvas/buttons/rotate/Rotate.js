import React, {Component} from 'react';
import './Rotate.css';
import Button from '@material-ui/core/Button';

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
        }, 
            () => this.props.callback(this.state.degrees)
        );
    }

    render(){
        return(
            <div className="Rotate">
                <Button variant="contained" onClick={this.onClick}>Rotate Image</Button>
            </div>
        );
    }

}

export default Rotate;