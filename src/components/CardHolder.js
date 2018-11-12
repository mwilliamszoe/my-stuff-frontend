import React, { Component } from "react";
import ContentCard from "./ContentCard";
import { Card } from "semantic-ui-react";
import "../index.css";

const key = "AIzaSyD3-RiP1NigNuiJnQlgZqdJAduRZerifQE";
const url = `https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&${key}=yourAPIKey`;

class CardHolder extends Component {
  state = {
    bookList: { items: [] }
  };
  componentDidMount = () => {
    fetch(url)
      .then(r => r.json())
      .then(bookList =>
        this.setState({
          bookList
        })
      );
  };

  render() {
    const bookItems = this.state.bookList.items;
    let cards = bookItems.map((book, idx) => {
      console.log(book);
      return <ContentCard book={book} key={idx} />;
    });
    return <Card.Group itemsPerRow={4}>{cards}</Card.Group>;
  }
}

export default CardHolder;
