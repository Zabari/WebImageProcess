import React, {Component} from 'react';
import './Undo.css';
import Button from '@material-ui/core/Button';


class Undo extends Component{

    constructor(){
        super();
        this.state = {
            toggled : false,

        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(e){

        this.props.callback();
    }

    render(){
        // let disabled=null;
        // if (!this.props.enabled){
        //     disabled= (disabled);
        // }

        return(
            <div className="Undo">
                <Button variant="contained" onClick={this.onClick} disabled={!this.props.enabled}>Undo</Button>
            </div>
        );
    }

}

export default Undo;
