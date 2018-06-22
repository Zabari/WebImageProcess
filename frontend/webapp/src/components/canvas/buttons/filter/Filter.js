import React, { Component } from 'react';
import './Filter.css';
import Button from '@material-ui/core/Button';



class Filter extends Component{

    constructor(){
        super();
        this.state = {
            toggled : false,
            sliderValue : 50,
            color: 0x00
        };
        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    onClick(e){
        let isToggled = this.state.toggled;
        this.setState({
            toggled : !isToggled
        })
    }

    handleSubmit(e){
        const colorval = document.getElementById("colorpicker").value;
        this.setState({
            color: colorval
        }, () =>
        this.props.callback(this.state.color,this.state.sliderValue));
    }

    handleChange(e){
        const newval = e.target.value;
        this.setState({
            sliderValue : newval
        });
    }


    render(){
       
        return(
            <div className="slidecontainer">
            <input onChange = {this.handleChange}
            type="range" min="1" max="100" value={this.state.sliderValue} className="slider" id="myRange" />
            <input type="color" id="colorpicker"/>
            <Button variant="contained" onClick={this.handleSubmit} size="small">Make Filter</Button>
        </div>
        );
    }

}

export default Filter;