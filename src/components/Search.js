import React from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import "../index.css";

const Search = props => {
  return (
    <div className="homePageWithSearch">
      <Input
        transparent
        placeholder="Click Below to Search"
        className="searchInput"
        onChange={props.handleChange}
      />

      <Button icon onClick={props.handleClick}>
        <Icon name="search" />
      </Button>
    </div>
  );
};

export default Search;
