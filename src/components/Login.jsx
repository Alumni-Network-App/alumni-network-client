import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "user",
      password: "password",
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return <div></div>;
  }
}
