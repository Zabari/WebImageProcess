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
              color: "",
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

  filterCallback = (filterData) => {
    this.setState({
        filter : filterData
    });
  }

  flipCallback = (flipData) => {
    this.setState({
        flipped : flipData
    });
    console.log(this.state.flipped);
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
      e.preventDefault();
      this.addPhoto();
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
            command: this.state.command,
            rotationDegree: this.state.degrees,
            trimX: this.state.trimDimensions.x,
            trimY: this.state.trimDimensions.y,
            filterColor: this.state.filter.color,
            filterPercent: this.state.filter.percent
          })
        })
        .then( (response) => {
          this.setState({saved:1});
        });
      }

      addPhoto(){
          console.log("test");
        fetch("/api/add", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            url : "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13001000/Beagle-On-White-01-400x267.jpg"
          })
        })
        .then( (response) => {
        //   this.setState({saved:1});
        console.log(response);
        });
      }

addData(){

}

handleCanvasClick(e){

    // this.setState({currentTool: 'rotate'});

    // if(this.state.currentTool === 'trim'){
    //     // let begin_x = this.state.mouseX;
    //     // let begin_y = this.state.mouseY;
    // }
    
    // else if(this.state.currentTool === 'flip'){
    //     this.renderFlip();
    // }
    // else if(this.state.currentTool === 'color'){
    //     this.renderColorSlider();
    // }
}

    renderImg(){
        return (
        <div onMouseMove = {this._onMouseMove} onClick={this.handleCanvasClick} className="Canvas">
            <h1>This is the canvas</h1>
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
          <h1>This is the canvas</h1>
          <h2>Coordinates: {x} {y} </h2>
          <Filter callback = {this.filterCallback}/>
          <Flip callback = {this.flipCallback} />
          <Rotate callback = {this.rotateCallback}/>
          <Trim callback = {this.trimCallback}/>
          <Undo callback = {this.undoCallback} />
          <Add callback = {this.addCallback}/>
          <button onClick={this.handleSubmit}>add pic</button>
      </div>
    );
  }
}

// Need event for when user exits the page

export default Canvas;