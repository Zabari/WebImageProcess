import React, { Component } from 'react';
import './Filter.css';

class Filter extends Component{

    constructor(){
        super();
        this.state = {
            toggled : false,
            sliderValue : 50,
            color: ""
        };
        this.onClick = this.onClick.bind(this);
        this.renderSlider = this.renderSlider.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTextSubmit = this.handleTextSubmit.bind(this);
    }

    onClick(e){
        let isToggled = this.state.toggled;
        this.setState({
            toggled : !isToggled
        })
    }

    handleTextChange(e){
        const tempColor = e.target.value;
        this.setState({
            color : tempColor
        });
    }

    handleTextSubmit(e){
        // callback 
        e.preventDefault();
        let isToggled = !this.state.toggled;
        this.setState({
            toggled : isToggled,
            color : ""
        });
        this.renderSlider();
    }

    handleChange(e){
        const newval = e.target.value;
        this.setState({
            sliderValue : newval
        });
        console.log(this.state.sliderValue);
    }

    renderText(){
        return(
            <div className="color-button">
                <form onSubmit={this.handleTextSubmit}>
                <input onChange={this.handleTextChange} type="text"/>
                    Type Color (use hex)
                </form>
            </div>
        );
    }

    renderSlider(){
        return(
        <div className="slidecontainer">
            <input onChange = {this.handleChange}
            type="range" min="1" max="100" value={this.state.sliderValue} className="slider" id="myRange" />
            <button onClick={this.onClick}>{this.state.toggled ? (<b>Close Slider</b>) : (<b>Open Slider</b>) }</button>
        </div>
        );
    }

    render(){
        if(this.state.toggled){
            return this.renderText();
        }
        return(
            <div className="filter-button">
        <button onClick={this.onClick}> <b>Filter</b> </button>
            </div>
        );
    }

}

export default Filter;