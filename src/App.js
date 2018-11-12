import React, { Component } from "react";
import HomePage from "./components/HomePage";
import "./index.css";

class App extends Component {
  render() {
    return (
      <div>
        {/* if logged in show homepage */}
        <HomePage />
        {/* if logged out show sign up */}
      </div>
    );
  }
}

export default App;
