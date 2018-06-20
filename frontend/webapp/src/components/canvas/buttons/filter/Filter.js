import React, { Component } from 'react';
import './Filter.css';

class Filter extends Component{

    constructor(){
        super();
        this.state = {
            toggled : false,
            sliderValue : 50,
            color: 0x00
        };
        this.onClick = this.onClick.bind(this);
        this.renderInputs = this.renderInputs.bind(this);
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
        });
        this.props.callback(this.state.color,this.state.sliderValue);
    }

    handleChange(e){
        const newval = e.target.value;
        this.setState({
            sliderValue : newval
        });
        
    }


    renderInputs(){
        return(
        <div className="slidecontainer">
            <input onChange = {this.handleChange}
            type="range" min="1" max="100" value={this.state.sliderValue} className="slider" id="myRange" />
            <input type="color" id="colorpicker"/>
            <button onClick={this.handleSubmit}>Make Filter</button>
            <button onClick={this.onClick}>{this.state.toggled ? (<b>Close Filter</b>) : (<b>Open Filter</b>) }</button>
        </div>
        );
    }

    render(){
        if(this.state.toggled){
            return this.renderInputs();
        }
        return(
            <div className="filter-button">
        <button onClick={this.onClick}> <b>Filter</b> </button>
            </div>
        );
    }

}

export default Filter;