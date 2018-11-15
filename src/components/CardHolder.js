import React, { Component } from "react";
import ContentCard from "./ContentCard";
import { Card } from "semantic-ui-react";
import "../index.css";

const key = "AIzaSyD3-RiP1NigNuiJnQlgZqdJAduRZerifQE";
const url = `https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&${key}=yourAPIKey`;

class CardHolder extends Component {
  state = {
    originalListOfBooks: []
  };
  componentDidMount = () => {
    fetch(url)
      .then(r => r.json())
      .then(book =>
        this.setState({
          originalListOfBooks: book.items
        })
      );
  };

  render() {
    const bookItems = this.state.originalListOfBooks.items;
    let cards = bookItems.map((book, idx) => {
      return (
        <ContentCard book={book} key={idx} addToList={this.props.addToList} />
      );
    });
    return <Card.Group itemsPerRow={4}>{cards}</Card.Group>;
  }
}

export default CardHolder;
