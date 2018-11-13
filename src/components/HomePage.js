import React, { Component } from "react";
import ContentCard from "./ContentCard";
import ListHolder from "./ListHolder";
import { Card, Input } from "semantic-ui-react";
import "../index.css";

const key = "AIzaSyD3-RiP1NigNuiJnQlgZqdJAduRZerifQE";
const query = "birds";
const sampleUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&${key}`;
// const searchUrl = google_id => {
//   return `https://www.googleapis.com/books/v1/volumes/${google_id}?key=${key}`;
// };

class Homepage extends Component {
  state = {
    bookAPI: [],
    users: [],
    lists: [],
    filteredListOfBooks: []
  };
  componentDidMount = () => {
    fetch(sampleUrl)
      .then(r => r.json())
      .then(bookAPI =>
        this.setState({
          bookAPI: bookAPI.items
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
    //loop throught the listObj.books array, creating a new array of FULL BOOKS
    //you must make a fetch for a SINGLE BOOK each time
    //set the state bookAPI to be that new array
    // book.google_id
    // console.log(listObj.books);
    Promise.all(
      listObj.books.map(book =>
        fetch(
          `https://www.googleapis.com/books/v1/volumes/${
            book.google_id
          }?key=${key}`
        ).then(r => r.json())
      )
    ).then(bookAPI =>
      this.setState({
        // filteredListOfBooks: [...this.state.filteredListOfBooks, book]
        bookAPI: bookAPI
      })
    );
  };

  render() {
    console.log(this.state.bookAPI, "bookAPI");
    // console.log(this.state.filteredListOfBooks, "filtered list");
    let cards = this.state.bookAPI.map((book, idx) => {
      return <ContentCard book={book} key={idx} addToList={this.addToList} />;
    });
    return (
      <div className="homePageWithSearch">
        <Input icon="search" placeholder="Search..." />
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
