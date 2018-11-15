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
    filteredListOfBooks: []
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

  handleSearch = event => {
    // const desiredBooks = this.state.originalListOfBooks.filter(book => {
    //   return book.volumeInfo.includes(event.target.value);
    // });
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${event.target.value}`)
      .then(r => r.json())
      .then(books => {
        //these books match search query
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
        <Search handleSearch={this.handleSearch} />
        <div className="homePageWithoutSearch">
          <ListHolder lists={this.state.lists} showList={this.showList} />
          <Card.Group itemsPerRow={4}>{cards}</Card.Group>
        </div>
      </div>
    );
  }
}

export default Homepage;

// ("Access Not Configured. Books API has not been used in project 940221824101 before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/books.googleapis.com/overview?project=940221824101 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.");
