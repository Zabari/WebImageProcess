import React, { Component } from 'react';
import './App.css';
import './components/canvas/Canvas.css';
import Canvas from './components/canvas/Canvas.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <title>Image Processor</title>
        <div className="page-header">
          <h1 text-align="center">Welcome to IMGPRO.</h1>
        </div>
        <br></br>
        <Canvas></Canvas> 
        
      </div>
    );
  }
}

export default App;
