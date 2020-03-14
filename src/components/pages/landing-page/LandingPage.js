import React, { Component } from "react";
import UserLoginPage from "../user-login-page/UserLoginPage";
import BaseScene from "../../base/Base";
// import { SocketContext } from "../../shared/context/socket";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      user: undefined
    };
  }

  setUser(name) {
    if (name && name.length > 0) {
      this.setState({
        user: name
      });
    }
  }
  render() {
    return (
      // <SocketContext.Consumer>
      //   {socket =>
      !this.state.user ? <UserLoginPage user={e => this.setUser(e)} /> : <BaseScene />
      //   }
      // </SocketContext.Consumer>
    );
  }
}

export default LandingPage;
