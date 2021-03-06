import React, { Component } from 'react';
import './Canvas.css';
import Filter from './buttons/filter/Filter.js';
import Flip from './buttons/flip/Flip.js';
import Rotate from './buttons/rotate/Rotate.js';
import Undo from './buttons/undo/Undo.js';
import Trim from './buttons/trim/Trim.js';
import Add from './buttons/add/Add.js';
import Toolbar from '@material-ui/core/Toolbar';

'use strict';
class Canvas extends Component {

  constructor(props){
      super(props);
      this.state = {
          command : "",
          trimming : false,
          flag: false,
          filename: "",
          url: "",
          degrees: 0,
          trimDimensions: {
              area: "",
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
          },
          localURL:"http://104.131.44.27",
          undo: false
          
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
        command : 'rotate',
        degrees : degreeData
      }, () =>
      this.performAction({}));
  }

  filterCallback = (filterColor,filterPercent) => {
    this.setState({
        command: "color",
        filter : {
            color: filterColor,
            percent : filterPercent
        }
    }, () => this.performAction({}));
  }

  flipCallback = (flipData) => {

    this.setState({
        command : 'flip',
        flipped : flipData
    }, ()=>
    this.performAction(          {flipped : {
                  x : false,
                  y : false
              }}));
  }

  undoCallback = () => {
        this.setState({
            command : 'undo'
        }, ()=>

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
            console.log(response.id);
            const newundo=(response.id!=0);
            //console.log(typeof response.id);
            if (newundo){
                this.setState({
                    url:response.id,
                    undo:newundo
                });
            }
            else{
                console.log("what is going on");
                this.setState({
                    undo:newundo
                });
            }
        }));
  }

  trimCallback = (trimData) => {
    this.setState({
        trimming : trimData
    }, () =>
    console.log(this.state.trimming));
  }

  addCallback = (imgData) => {
    // this.setState({
    //     url : imgData
    // });
    this.addPhoto(imgData);
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
            this.setState({
                mouseX: e.nativeEvent.offsetX,
                mouseY: e.nativeEvent.offsetY,
            });
    }

    handleCanvasClick(e){
        if(this.state.trimming){
            console.log("you're trimming!");
            if(!this.state.flag){
                let dimensionsCopy = this.state.trimDimensions;
                dimensionsCopy.x = this.state.mouseX;
                dimensionsCopy.y = this.state.mouseY;
                this.setState({
                    flag : !this.state.flag,
                    trimDimensions : dimensionsCopy
                })
            }
            else if(this.state.flag){
                var rectArea = Math.abs(this.state.mouseX - this.state.trimDimensions.x ) + "x" + Math.abs(this.state.mouseY - this.state.trimDimensions.y);
                let dimensionsCopy = this.state.trimDimensions;
                dimensionsCopy.area = rectArea;
                this.setState({
                    flag : !this.state.flag,
                    trimDimensions : dimensionsCopy,
                    command : 'crop'
                }, () => {console.log(this.state.trimDimensions);this.performAction(
                    {
                        flag : !this.state.flag,
                        trimDimensions: {
                            area: "",
                            x: 0,
                            y: 0
                        },
                        trimming:!this.state.trimming
                    })});
            }
            //this.performAction();
        }
    }


    performAction(prevState){

        let commandParams = [];
        if(this.state.command === 'color'){
            commandParams = [this.state.filter.color,this.state.filter.percent];
        }   else if(this.state.command === 'crop'){
            commandParams = [this.state.trimDimensions.area,this.state.trimDimensions.x,this.state.trimDimensions.y];

        }   else if(this.state.command === 'rotate'){
                commandParams = [this.state.degrees];
        }
            else if(this.state.command === 'flip'){
                commandParams = [this.state.flipped.x,this.state.flipped.y];
                // console.log(commandParams);
        }

        fetch("/api/edit", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            filename : this.state.url,
            command : this.state.command,
            params: commandParams
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
            const newundo=(response.id!=0);
            this.setState({
                url : response.id,
                undo: newundo
            });
            // console.log(prevState);
            this.setState(
                prevState
            );
        });

      }

      addPhoto(img){

        fetch("/api/add", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
                url : img
          })
        })
        .then ( (response) => response.json())
        .then ( (response) => {
                this.setState({
                    url :  JSON.parse(response.id)
                })
        });
      }


    renderImg(){
        return (
            <div className="Screen">
                <ul>
                    <li><Add callback = {this.addCallback} /></li>
                    <li><Filter callback = {this.filterCallback}/></li>
                    <li><Flip callback = {this.flipCallback} /></li>
                    <li><Rotate callback = {this.rotateCallback} /></li>
                    <li><Trim callback = {this.trimCallback} /></li>
                    <li><Undo callback = {this.undoCallback} enabled={this.state.undo} /></li>
                </ul>
              <div onMouseMove = {this._onMouseMove} onClick={this.handleCanvasClick} className="Canvas">
              <img src={this.state.localURL+"/api/image/" +this.state.url} alt="user img" />
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
              {/* <li><Filter callback = {this.filterCallback}/></li>
              <li><Flip callback = {this.flipCallback} /></li>
              <li><Rotate callback = {this.rotateCallback} /></li>
              <li><Trim callback = {this.trimCallback} /></li>
              <li><Undo callback = {this.undoCallback} enabled={this.state.undo} /></li> */}
              <li><Add callback = {this.addCallback} /></li>
            </ul>
            <div onMouseMove = {this._onMouseMove} onClick={this.handleCanvasClick} className="Canvas">
          </div>
      </div>
    );
  }
}

// Need event for when user exits the page

export default Canvas;
