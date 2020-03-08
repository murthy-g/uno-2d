import React, { Component } from "react";
import User from "../user";
import BaseScene from "../base/Base";
// import { SocketContext } from "../../shared/context/socket";

export default class EntryFile extends Component {
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
      !this.state.user ? <User user={e => this.setUser(e)} /> : <BaseScene />
      //   }
      // </SocketContext.Consumer>
    );
  }
}
