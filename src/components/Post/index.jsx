import React from "react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import {
  addTodoActionCreator,
  getApiActionCreator,
  clearListPostActionCreator,
} from "../../context/action";
import axios from "axios";
import ListPost from "./ListPost";
import ListFilter from "./ListFilter";
const Post = () => {
  const [, dispatch] = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [statusAdd, setStatusAdd] = useState(true);

  useEffect(() => {
    if (title) {
      setStatusAdd(false);
    } else {
      setStatusAdd(true);
    }
  }, [title]);

  async function getAllPosts() {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    dispatch(getApiActionCreator(data));
  }

  const onClickAdd = () => {
    dispatch(addTodoActionCreator(title));
    setTitle("");
  };

  return (
    <div>
      <input
        placeholder="enter name post"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button onClick={onClickAdd} disabled={statusAdd}>
        Add
      </button>
      <button
        onClick={() => {
          dispatch(clearListPostActionCreator());
          setTitle("");
        }}
      >
        Clear
      </button>
      <button onClick={() => getAllPosts()}>Fetch Api</button>
      <ListFilter />
      <ListPost />
    </div>
  );
};

export default Post;
