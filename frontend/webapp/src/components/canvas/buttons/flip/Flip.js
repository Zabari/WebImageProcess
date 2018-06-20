import React, {Component} from 'react';
import './Flip.css';

class Flip extends Component{

    constructor(){
        super();
        this.state = {
            toggled : {
                x : false,
                y : false
            }
        };
        this.onClickX = this.onClickX.bind(this);
        this.onClickY = this.onClickY.bind(this);
    }

    onClickX(e){
        let isToggledX = !this.state.toggled.x;
        let isToggledY = this.state.toggled.y;
        this.setState({
            toggled : {
                isToggledX, isToggledY
            }
        })
        this.props.callback(this.state.toggled);
    }

    onClickY(e){
        let isToggledX = this.state.toggled.x;
        let isToggledY = !this.state.toggled.y;
        this.setState({
            toggled : {
                isToggledX, isToggledY
            }
        })
        this.props.callback(this.state.toggled);
    }

    render(){
        return(
            <div className="Flip">
                <button onClick={this.onClickX}>Flip X</button>
                <button onClick={this.onClickY}>Flip Y</button>
            </div>
        );
    }

}

export default Flip;