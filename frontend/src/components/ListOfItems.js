import React from "react";

const ListOfItems = ({ data, name }) => {
  if (data.length) {
    return <div>These are the list of {name} provided to us!</div>;
  } else {
    return <div>There are no {name} provided to us!</div>;
  }
};

export default ListOfItems;
