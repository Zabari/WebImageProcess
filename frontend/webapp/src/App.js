import React, { Component } from 'react';
import './App.css';
import './components/canvas/Canvas.css';
import Canvas from './components/canvas/Canvas.js';
// import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <div className="App">
        <title>Image Processor</title>
        <div className="page-header">
          <h1 text-align="center">Welcome to IMGPRO</h1>
        </div>
        <br></br>
        <Canvas className="Canvas"></Canvas> 
        <div className="Footer">
        </div>
      </div>
    );
  }
}

export default App;
