import React from 'react';
import './App.css';
import BaseScene from './components/base';
import io from 'socket.io-client';

class App extends React.Component {
  constructor() {
    super();
    this.socket = io("http://localhost:2020");
  }
  render() {
    return (
      <div className="App">
        <BaseScene />
      </div>
    );
  }
}
export default App;
