import React, { Component } from "react";
import ContentCard from "./ContentCard";
import ListHolder from "./ListHolder";
import Search from "./Search";
import { Card } from "semantic-ui-react";
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

  // 1) put onChange handler on getBooks input. This will update this.state.searchTerm
  // 2) put onClick handlder on search button. This will make the fetch request and then set this.state.filteredListOfBooks

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
          <ListHolder lists={this.state.lists} showList={this.showList} />
          <Card.Group itemsPerRow={4}>{cards}</Card.Group>
        </div>
      </div>
    );
  }
}

export default Homepage;
