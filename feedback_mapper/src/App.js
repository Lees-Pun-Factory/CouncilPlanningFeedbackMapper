import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Mapper from './mapper/mapper.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Mapper/>
        </header>
      </div>
    );
  }
}

export default App;
