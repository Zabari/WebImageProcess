import React, { Component } from 'react';
import './Canvas.css';
import Filter from './buttons/filter/Filter.js';
import Flip from './buttons/flip/Flip.js';
import Rotate from './buttons/rotate/Rotate.js';
import Undo from './buttons/undo/Undo.js';
import Trim from './buttons/trim/Trim.js';
import Add from './buttons/add/Add.js';

class Canvas extends Component {

  constructor(props){
      super(props);
      this.state = {
          command : "",
          trimming : false,
          url: "",
          degrees: 0,
          trimDimensions: {
              x: 0,
              y: 0
          },
          filter:{
              color: 0x00,
              percent: 0
          },
          mouseX: 0,
          mouseY: 0,
          flipped : {
              x : false,
              y : false
          }
      };
      this._onMouseMove=this._onMouseMove.bind(this);
      this.handleCanvasClick = this.handleCanvasClick.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  rotateCallback = (degreeData) => {
      this.setState({
        degrees : degreeData
      });
  }

  filterCallback = (filterColor,filterPercent) => {
    this.setState({
        filter : {
            color: filterColor,
            percent : filterPercent
        }
    });
    console.log(this.state.filter);
  }

  flipCallback = (flipData) => {
    // this.setState({
    //     flipped : {
    //         x : 
    //         y : 
    //     }
    // });
    // console.log(this.state.flipped);
  }

  undoCallback = (undoData) => {
    // 
  }

  trimCallback = (trimData) => {
    this.setState({
        trimming : trimData
    });
    console.log(this.state.trimming);
  }

  addCallback = (imgData) => {
    this.setState({
        url : imgData
    });
  }

  handleSubmit(e){
      //this.addPhoto();
      this.saveData();
      e.preventDefault();
  }

_onMouseMove(e) {
        this.setState({ mouseX: e.nativeEvent.offsetX, mouseY: e.nativeEvent.offsetY });
    }
    
    saveData(){
        fetch("/api/save", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            filename: 'test',
            command: this.state.command,
            rotationDegree: this.state.degrees,
            trimX: this.state.trimDimensions.x,
            trimY: this.state.trimDimensions.y,
            filterColor: this.state.filter.color,
            filterPercent: this.state.filter.percent
          })
        })
        .then ( (response) => response.json())
        .then( (response) => {
            
        });
      }

      addPhoto(){
        
        fetch("/api/add", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
                url : this.state.url 
          })
        })
        .then ( (response) => response.json())
        .then( (response) => {
        console.log(response);
        });
      }



handleCanvasClick(e){



}

    renderImg(){
        return (
        <div onMouseMove = {this._onMouseMove} onClick={this.handleCanvasClick} className="Canvas">
            <h2>Coordinates: {this.state.mouseX} {this.state.mouseY} </h2>
            <Filter callback = {this.filterCallback}/>
            <Flip callback = {this.flipCallback} />
            <Rotate callback = {this.rotateCallback}/>
            <Trim callback = {this.trimCallback}/>
            <Undo callback = {this.undoCallback} />
            <Add callback = {this.addCallback}/>
            <img src={this.state.url} alt="user img" width ="720" height="1080"/>
        </div>
           );
    }


  render() {

    const x = this.state.mouseX;
    const y = this.state.mouseY;

    if(this.state.url !== ""){
       //console.log(this.state.url);
       return this.renderImg(); 
    }
    return (

      <div onMouseMove = {this._onMouseMove} onClick={this.handleCanvasClick} className="Canvas">
          <h2>Coordinates: {x} {y} </h2>
          <Filter callback = {this.filterCallback}/>
          <Flip callback = {this.flipCallback} />
          <Rotate callback = {this.rotateCallback}/>
          <Trim callback = {this.trimCallback}/>
          <Undo callback = {this.undoCallback} />
          <Add callback = {this.addCallback}/>
          <button type ="button" onClick={this.handleSubmit}>add pic</button>
      </div>
    );
  }
}

// Need event for when user exits the page

export default Canvas;