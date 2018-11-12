import React, { Component } from "react";
import CardHolder from "./CardHolder";
import ListHolder from "./ListHolder";
import "../index.css";

class Homepage extends Component {
  state = {
    user: []
  };

  componentDidMount = () => {
    fetch("http://localhost:4000/users")
      .then(r => r.json())
      .then(user => {
        this.setState({
          user
        });
      });
  };

  render() {
    return (
      <div>
        {/* user homepage:
        {this.state.user.map(user => {
          return user.name;
        })} */}
        <CardHolder />
        <ListHolder />
      </div>
    );
  }
}

export default Homepage;
