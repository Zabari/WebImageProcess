import React, {Component} from 'react';
import './Flip.css';

class Flip extends Component{

    constructor(){
        super();
        this.state = {
            xtoggled : false,
            ytoggled : false
        };
        this.onClickX = this.onClickX.bind(this);
        this.onClickY = this.onClickY.bind(this);
    }

    onClickX(e){
        let isToggledX = !this.state.xtoggled;
        this.setState({
            xtoggled : isToggledX
        })
        this.props.callback(this.state.xtoggled);
    }

    onClickY(e){
        let isToggledY = !this.state.ytoggled;
        this.setState({
            ytoggled : isToggledY
        })
        this.props.callback(this.state.ytoggled);
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