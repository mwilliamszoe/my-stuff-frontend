import React, { Component } from "react";
import ContentCard from "./ContentCard";
import ListHolder from "./ListHolder";
import HomePage from "./HomePage";
import Search from "./Search";
import { Card } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "../index.css";

const key = "AIzaSyD3-RiP1NigNuiJnQlgZqdJAduRZerifQE";
const sampleUrl = `https://www.googleapis.com/books/v1/volumes?q=patience`;
// const searchUrl = google_id => {
//   return `https://www.googleapis.com/books/v1/volumes/${google_id}?key=${key}`;
// };

class Homepage extends Component {
  state = {
    originalListOfBooks: [],
    users: [],
    lists: [],
    filteredListOfBooks: [],
    searchTerm: "patience"
  };
  componentDidMount = () => {
    fetch(sampleUrl)
      .then(r => r.json())
      .then(originalListOfBooks =>
        this.setState({
          originalListOfBooks: originalListOfBooks.items,
          filteredListOfBooks: originalListOfBooks.items
        })
      );
    fetch("http://localhost:4000/users")
      .then(r => r.json())
      .then(user => {
        this.setState({
          users: user
        });
      });
    fetch("http://localhost:4000/lists")
      .then(r => r.json())
      .then(aList => {
        this.setState({
          lists: aList
        });
      });
  };

  addToList = bookObj => {
    console.log(bookObj);
  };

  showList = listObj => {
    Promise.all(
      listObj.books.map(book =>
        fetch(
          `https://www.googleapis.com/books/v1/volumes/${
            book.google_id
          }?key=${key}`
        ).then(r => r.json())
      )
    ).then(originalListOfBooks =>
      this.setState({
        originalListOfBooks
      })
    );
  };

  handleChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  handleClick = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes/?q=${this.state.searchTerm}`
    )
      .then(r => r.json())
      .then(books => {
        this.setState({
          filteredListOfBooks: books.items
        });
      });
  };

  render() {
    console.log(this.props.match.path);
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.path}/search/`}
            render={props => {
              return (
                <Search
                  {...props}
                  handleChange={this.handleChange}
                  handleClick={this.handleClick}
                />
              );
            }}
          />
          <Route
            path={`${this.props.match.path}/`}
            render={props => {
              let cards = this.state.filteredListOfBooks.map((book, idx) => {
                return (
                  <ContentCard
                    book={book}
                    key={idx}
                    addToList={this.addToList}
                    filteredListOfBooks={this.state.filteredListOfBooks}
                  />
                );
              });
              return (
                <div className="homePageWithSearch">
                  <Search
                    handleChange={this.handleChange}
                    handleClick={this.handleClick}
                  />
                  <div className="homePageWithoutSearch">
                    <ListHolder
                      lists={this.state.lists}
                      showList={this.showList}
                    />
                    <Card.Group itemsPerRow={4}>{cards}</Card.Group>
                  </div>
                </div>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default Homepage;
