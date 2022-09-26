import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./../../context/AppProvider";

const ListPost = () => {
  const [state] = useContext(AppContext);
  const [listPost, setListPost] = useState([]);

  useEffect(() => {
    const list = state.listPost.filter((item) =>
      item.title.includes(state.searchKey)
    );
    setListPost(list);
  }, [state]);

  return (
    <div>
      {listPost &&
        listPost.map((item, index) => (
          <div key={item.id}>
            <div>{item.title}</div>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default ListPost;
