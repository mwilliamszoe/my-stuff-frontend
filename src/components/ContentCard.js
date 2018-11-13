import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import "../index.css";

const ContentCard = props => (
  <Card className="card" onClick={() => props.addToList(props.book)}>
    <Card.Content>
      <Card.Meta>
        {props.book.volumeInfo
          ? props.book.volumeInfo.title
              .split("")
              .splice(0, 50)
              .join("")
          : "No Title Specified"}
      </Card.Meta>
    </Card.Content>
    <Image
      src={
        props.book.volumeInfo
          ? props.book.volumeInfo.imageLinks.thumbnail
          : null
      }
    />
  </Card>
);

export default ContentCard;
