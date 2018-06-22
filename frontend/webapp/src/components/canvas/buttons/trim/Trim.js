import React, {Component} from 'react';
import './Trim.css';
import Button from '@material-ui/core/Button';


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
                <Button variant="contained" color="primary" className="selected" onClick={this.handleClick}>Trim Img</Button>
            </div>    
            );
        }
        return(
            <div className="Trim">
                <Button variant="contained" className="unselected" onClick={this.handleClick}>Trim Img</Button>
            </div>
        );
    }

}

export default Trim;