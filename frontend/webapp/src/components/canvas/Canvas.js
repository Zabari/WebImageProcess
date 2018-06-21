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
          tempUrl: "",
          filename: "",
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
      this.rotateCallback = this.rotateCallback.bind(this);
      this.filterCallback = this.filterCallback.bind(this);
      this.flipCallback = this.flipCallback.bind(this);
      this.undoCallback = this.undoCallback.bind(this);
      this.trimCallback = this.trimCallback.bind(this);
      this.addCallback = this.addCallback.bind(this);
      this.performAction = this.performAction.bind(this);
      this.addPhoto = this.addPhoto.bind(this);
  }
  
  rotateCallback = (degreeData) => {
      this.setState({
        command : 'flip',
        degrees : degreeData
      });
      console.log(this.state.degrees);
  }

  filterCallback = (filterColor,filterPercent) => {
    this.setState({
        command: 'color',
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
    if(undoData){
        this.setState({
            command : 'undo'
        });

        fetch("/api/undo",{
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                command: this.state.command,
                filename: this.state.url
            })
        })
        .then ( (response) => response.json())
        .then ( (response) => {
            console.log(response);
        });
    }
  }

  trimCallback = (trimData) => {
    this.setState({
        command : 'crop',
        trimming : trimData
    });
    console.log(this.state.trimming);
  }

  addCallback = (imgData) => {
    this.setState({
        url : imgData
    });
    this.addPhoto();
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.url);
    fetch("/api/add/", {
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
    .then ( (response) => {
            console.log(response.id);
    });
    //this.performAction();
    //   this.performAction();
    //   e.preventDefault();

  }

_onMouseMove(e) {
        this.setState({ mouseX: e.nativeEvent.offsetX, mouseY: e.nativeEvent.offsetY });
    }
    
    performAction(){
        fetch("/api/edit", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            command : "color",
            params: ["green",100]
            // command: this.state.command,
            // rotationDegree: this.state.degrees,
            // trimX: this.state.trimDimensions.x,
            // trimY: this.state.trimDimensions.y,
            // filterColor: this.state.filter.color,
            // filterPercent: this.state.filter.percent
          })
        })
        

        .then ( (response) => response.json())
        .then ( (response) => {
            this.setState({
                url: this.state.tempUrl
            })
        });
        this.render();
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
        .then ( (response) => {
                this.setState({
                    tempUrl : process.env.PUBLIC_URL + "/images/" + JSON.parse(response.id)
                }) 
        });
      }



handleCanvasClick(e){



}

    renderImg(){
        return (
            <div className="Screen">
            <ul>
                <li><Filter callback = {this.filterCallback}/></li>
                <li><Flip callback = {this.flipCallback} /></li>
                <li><Rotate callback = {this.rotateCallback} /></li>
                <li><Trim callback = {this.trimCallback} /></li>
                <li><Undo callback = {this.undoCallback} /></li>
                <li><Add callback = {this.addCallback} /></li>
                <li><button type ="button" onClick={this.handleSubmit}>do action</button></li>
              </ul>
              <div onMouseMove = {this._onMouseMove} onClick={this.handleCanvasClick} className="Canvas">
              <img src={this.state.url} alt="user img" />
            </div>
            </div>
           );
    }


  render() {

    if(this.state.url !== ""){
       //console.log(this.state.url);
       return this.renderImg(); 
    }
    return (

      <div className="Screen">
          <ul>
              <li><Filter callback = {this.filterCallback}/></li>
              <li><Flip callback = {this.flipCallback} /></li>
              <li><Rotate callback = {this.rotateCallback} /></li>
              <li><Trim callback = {this.trimCallback} /></li>
              <li><Undo callback = {this.undoCallback} /></li>
              <li><Add callback = {this.addCallback} /></li>
              <li><button type ="button" onClick={this.handleSubmit}>do action</button></li>
            </ul>
            <div onMouseMove = {this._onMouseMove} onClick={this.handleCanvasClick} className="Canvas">
          </div>
      </div>
    );
  }
}

// Need event for when user exits the page

export default Canvas;