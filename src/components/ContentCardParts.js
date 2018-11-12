// import React, { Component } from "react";
import React from "react";
import "../index.css";

export const Title = props => {
  return <div className="title">{props.book.volumeInfo.title}</div>;
};

export const Img = props => {
  return (
    <img
      className="image"
      // src={props.book.volumeInfo.imageLinks.smallThumbnail}
      src={
        props.book.volumeInfo.imageLinks
          ? props.book.volumeInfo.imageLinks.smallThumbnail
          : null
      }
    />
  );
};

export const Info = props => {
  return (
    <div>
      {props.book.searchInfo ? props.book.searchInfo.textSnippet : null}
    </div>
  );
};
