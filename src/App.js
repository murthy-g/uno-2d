import React from "react";
import "./App.css";
import EntryFile from "./components/entry";
import { SocketContext } from "./shared/context/socket";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      socket: null
    };
  }
  componentDidMount() {
    this.setState({
      socket: this.props.io
    });
  }
  
  render() {
    return (
      <SocketContext.Provider socket={this.state.socket}>
        <div className="App">
          <EntryFile />
        </div>
      </SocketContext.Provider>
    );
  }
}

App.contextType = SocketContext;

export default App;
