import React, { Component } from 'react';
import './App.css';
import './components/canvas/Canvas.css';
import Canvas from './components/canvas/Canvas.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <br></br>
        <Canvas></Canvas> 
        
      </div>
    );
  }
}

export default App;
