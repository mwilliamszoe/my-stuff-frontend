import React from "react";
import { Button } from "semantic-ui-react";

const ListCard = props => {
  return (
    <Button basic onClick={() => props.showList(props.list)}>
      {props.list.label}
    </Button>
  );
};

export default ListCard;
