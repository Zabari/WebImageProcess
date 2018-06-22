import React, {Component} from 'react';
import './Add.css';
import Button from '@material-ui/core/Button';


class Add extends Component{

    constructor(){
        super();
        this.state = {
            toggled : false,
            url : ""
        };
        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        const tempUrl = e.target.value;
        this.setState({
            url : tempUrl
        });
    }

    handleSubmit(e){
        this.props.callback(this.state.url);
        e.preventDefault();
        let isToggled = !this.state.toggled;
        this.setState({
            toggled : isToggled,
            url : ""
        });
    }

    onClick(e){
        let isToggled = this.state.toggled;
        this.setState({
            toggled : !isToggled
        })
    }

    renderText(){
        return (
            <div className="Add">
                Enter your url here:
                <form className ="input" onSubmit={this.handleSubmit}>
                <input onChange = {this.handleChange} value={this.state.url}type="text"/>
                </form>
            </div>
        );
    }

    render(){

        if(this.state.toggled){
            return this.renderText();
        }
        else return(
            <div className="Add">
                <Button variant="contained" onClick={this.onClick}>Add Img</Button>
            </div>
        );
    }

}

export default Add;