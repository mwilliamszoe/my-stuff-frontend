import React from "react";
import { Input } from "semantic-ui-react";
import "../index.css";

const Search = props => {
  return (
    <div className="homePageWithSearch">
      <Input
        transparent
        placeholder="Click Below to Search"
        className="searchInput"
        onChange={props.handleSearch}
      />
    </div>
  );
};

export default Search;
