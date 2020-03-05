import React, { Component } from "react";
import User from "../user";
import BaseScene from "../base";
import { SocketContext } from "../../shared/context/socket";

export default class EntryFile extends Component {
  constructor() {
    super();
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
      <SocketContext.Consumer>
        {socket =>
          !this.state.user ? (
            <User user={e => this.setUser(e)} socket={socket} />
          ) : (
            <BaseScene socket={socket} />
          )
        }
      </SocketContext.Consumer>
    );
  }
}
