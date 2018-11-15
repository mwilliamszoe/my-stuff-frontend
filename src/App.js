import React, { Component } from "react";
import HomePage from "./components/HomePage";
import Search from "./components/Search";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <HomePage /> */}
          <Link to="/">Homepage</Link>
          <Link to="/search">Search</Link>
          <Route path="" component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
