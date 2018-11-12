import React, { Component } from "react";
import { Title, Img, Info } from "./ContentCardParts";
import { Card, Image } from "semantic-ui-react";
import "../index.css";

// const urlQuery = `https://www.googleapis.com/books/v1/volumes?q=${query}:keyes&${key}=yourAPIKey`;

class ContentCard extends Component {
  render() {
    const truncatedTitle = this.props.book.volumeInfo.title
      .split("")
      .splice(0, 25)
      .join("");
    return (
      <Card>
        {/* <Title book={this.props.book} /> */}
        {/* <Img book={this.props.book} /> */}
        {/* <Info book={this.props.book} /> */}
        <Card.Content>
          <Card.Meta>{truncatedTitle}</Card.Meta>
        </Card.Content>
        <Image
          src={
            this.props.book.volumeInfo.imageLinks
              ? this.props.book.volumeInfo.imageLinks.smallThumbnail
              : null
          }
        />
      </Card>
    );
  }
}

export default ContentCard;
