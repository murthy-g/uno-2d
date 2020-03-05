import React, { Component } from "react";
import User from "../user";
import BaseScene from "../base";
import { SocketContext } from "../../shared/context/socket";

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
      !this.state.user ? (
        <User user={e => this.setUser(e)} socket={this.props.socket} />
      ) : (
        <BaseScene socket={this.props.socket} />
      )
      //   }
      // </SocketContext.Consumer>
    );
  }
}
