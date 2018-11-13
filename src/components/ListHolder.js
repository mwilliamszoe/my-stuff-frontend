import React from "react";
import ListCard from "./ListCard";

const ListHolder = props => {
  return (
    <div className="listHolder">
      {props.lists.map((list, idx) => {
        return <ListCard list={list} key={idx} showList={props.showList} />;
      })}
    </div>
  );
};

export default ListHolder;
