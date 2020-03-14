import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LandingPage, UserLoginPage, JoinCreateRoomPage } from "./components/pages";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={LandingPage} />
          <Route path="/rooms" component={JoinCreateRoomPage} />
        </div>
      </Router>
    );
  }
}

export default App;
