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
        // let isToggled = !this.state.toggled.x;
        // const y = this.state.y
        // this.setState({
        //     toggled : {
        //         x : isToggled,
        //         y : y
        //     }
        // }, () =>
        // this.props.callback(this.state.toggled));
        this.props.callback(  {
                        x : true,
                        y : false
                    });
    }

    onClickY(e){
        // let isToggled = !this.state.toggled.y;
        // const x = this.state.x;
        // this.setState({
        //     x : x,
        //     y : isToggled
        // }, () =>
        // this.props.callback(this.state.toggled));
        this.props.callback( {
                        x : false,
                        y : true
                    });
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
