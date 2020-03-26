import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LandingPage, UserLoginPage, JoinCreateRoomPage, GameRoomPage } from "./components/pages";
import SocketContext from "./shared/context/SocketContext";
import io from "socket.io-client";
import "./App.scss";

const socket = io("http://localhost:2020");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <SocketContext.Provider value={socket}>
        <Router>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={UserLoginPage} />
          <Route path="/rooms" component={JoinCreateRoomPage} />
          <Route path="/room" component={GameRoomPage} />
        </Router>
      </SocketContext.Provider>
    );
  }
}

export default App;
