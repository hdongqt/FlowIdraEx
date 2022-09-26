import React, { useContext } from "react";
import { filterSearchActionCreator } from "../../context/action";
import { AppContext } from "./../../context/AppProvider";

const ListFilter = () => {
  const [state, dispatch] = useContext(AppContext);

  const handelOnchangSearch = (value) => {
    dispatch(filterSearchActionCreator(value));
  };

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(e) => handelOnchangSearch(e.target.value)}
      />
    </div>
  );
};

export default ListFilter;
