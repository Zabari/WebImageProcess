import React, {Component} from 'react';
import './Trim.css';

class Trim extends Component{

    constructor(){
        super();
        this.state = {
            toggled : false,
            
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        var isToggled = !this.state.toggled;
        this.setState({
            toggled : isToggled
        }, () =>
        this.props.callback(this.state.toggled));
    }

    render(){

        if(this.state.toggled){
            return(
             <div className="Trim">
                <button className="selected" onClick={this.handleClick}>Trim Img</button>
            </div>    
            );
        }
        return(
            <div className="Trim">
                <button className="unselected" onClick={this.handleClick}>Trim Img</button>
            </div>
        );
    }

}

export default Trim;