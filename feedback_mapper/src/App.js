import React, { Component } from 'react';
import logo from './logo.svg';
import Scraper from '../src/scraper/scraper.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Scraper /> 
        </header>
      </div>
    );
  }
}

export default App;
