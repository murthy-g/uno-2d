import React from "react";
import "./App.css";
// import io from "socket.io-client";
import EntryFile from "./components/entry";
// import { SocketContext } from "./shared/context/socket";

// const socketIO = io("http://localhost:2020");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    // this.state = {
    //   socket: socketIO.io
    // };
  }
  // componentDidMount() {
  //   this.setState({
  //     socket: socketIO.io
  //   });
  // }

  render() {
    return (
      // <SocketContext.Provider socket={this.state.socket}>
      <div className="App">
        <EntryFile />
      </div>
      // </SocketContext.Provider>
    );
  }
}

// App.contextType = SocketContext;

export default App;
