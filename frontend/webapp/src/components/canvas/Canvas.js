import React, { Component } from 'react';
import './Canvas.css';
import Filter from './buttons/filter/Filter.js';

class Canvas extends Component {

  constructor(props){
      super(props);
      this.state = {
          currentTool: [
              "trim",
              "rotate",
              "flip",
              "filter"
          ],
          degrees: 0,
          trimDimensions: {
              x: 0,
              y: 0
          },
          filter:{
              color: "",
              percentage: 0
          },
          mouseX: 0,
          mouseY: 0,
          applyChange: false
      };
      this._onMouseMove=this._onMouseMove.bind(this);
      this.handleCanvasClick = this.handleCanvasClick.bind(this);
  }
    

_onMouseMove(e) {
        this.setState({ mouseX: e.nativeEvent.offsetX, mouseY: e.nativeEvent.offsetY });
    }
    
    sendData(){
        fetch("/api/save", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            command: this.state.currentTool,
            rotationDegree: this.state.degrees,
            trimX: this.state.trimDimensions.x,
            trimY: this.state.trimDimensions.y,
            filterType: this.state.filterType
          })
        })
        .then( (response) => {
          this.setState({saved:1});
        });
      }

handleCanvasClick(e){

    this.setState({currentTool: 'rotate'});

    if(this.state.currentTool === 'trim'){
        // let begin_x = this.state.mouseX;
        // let begin_y = this.state.mouseY;
    }
    else if(this.state.currentTool === 'rotate'){
        let currentDegrees = this.state.degrees;
        currentDegrees = (currentDegrees+ 90) % 360;
        this.setState({degrees : currentDegrees});
        console.log('desired rotation is ... ' + currentDegrees);
    }
    else if(this.state.currentTool === 'flip'){
        this.renderFlip();
    }
    else if(this.state.currentTool === 'color'){
        this.renderColorSlider();
    }
}

renderColorSlider(){

}

renderFlip(){

}

  render() {

    const x = this.state.mouseX;
    const y = this.state.mouseY;
    return (

      <div onMouseMove = {this._onMouseMove} onClick={this.handleCanvasClick} className="Canvas">
          <h1>This is the canvas</h1>
          <h2>Coordinates: {x} {y} </h2>
          <Filter></Filter>
      </div>
    );
  }
}

// Need event for when user exits the page

// Slider for the color! 

export default Canvas;