import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./containers/Todo/todoSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
