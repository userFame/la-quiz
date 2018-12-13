import React, { Component } from 'react';
import Quiz from './Quiz'
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Quiz Created for Loyal Assistant
          </p>
        </header>
        <Quiz />
      </div>
    );
  }
}

export default App;
