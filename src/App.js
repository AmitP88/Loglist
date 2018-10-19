import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import * as socket from './socket'
// import Loglist from './Loglist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form />
        <button className="addLogButton" onClick={socket.addLogToCollection}>add log</button>
      </div>
    );
  }
}

export default App;
