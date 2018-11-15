import React, { Component } from "react";
import MyList from "./MyList";
import ContentCard from "./ContentCard";
import { Card, Input, Button, Icon } from "semantic-ui-react";
import "../index.css";
const sampleUrl = `https://www.googleapis.com/books/v1/volumes?q=pateince`;

class Search extends Component {
  state = {
    books: []
  };
  componentDidMount = () => {
    fetch(sampleUrl)
      .then(r => r.json())
      .then(originalListOfBooks =>
        this.setState({
          books: originalListOfBooks.items
        })
      );
  };
  // addToList = bookObj => {
  //   console.log(bookObj);
  // };
  // selectList = list => {
  //   console.log(list);
  // };

  handleChange = () => {
    console.log("changed");
  };

  // search = () => {
  //   fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.query}`)
  //     .then(r => r.json())
  //     .then(books => {
  //       this.setState({ books: books.items });
  //     });
  // };

  render() {
    let cards = this.state.books.map((book, idx) => {
      return <ContentCard book={book} key={idx} addToList={this.addToList} />;
    });
    return (
      <div className="homePageWithSearch">
        <Input
          transparent
          placeholder="Click Below to Search"
          className="searchInput"
          onClick={this.handleChange}
        />
        <Button icon onClick={this.search}>
          <Icon name="search" />
        </Button>
        <div className="homePageWithoutSearch">
          <MyList
            lists={this.props.lists}
            showList={list => this.selectList(list)}
          />
          <Card.Group itemsPerRow={5}>{cards}</Card.Group>
        </div>
      </div>
    );
  }
}

export default Search;
