import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TYPE_FILTER } from "./../../utils/typeFilter";
import fetchTodo from "../../api/fetchTodo";

const todoSlice = createSlice({
  name: "todoList",
  initialState: {
    todoEdit: null,
    loading: false,
    filter: TYPE_FILTER.ALL,
    todoList: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
    },
    changeStatusTodo: (state, action) => {
      const todoFind = state.todoList.find((todo) => todo.id === action.payload);
      todoFind.done = !todoFind.done;
    },
    deleteTodo: (state, action) => {
      const index = state.todoList.findIndex((todo) => todo.id === action.payload);
      state.todoList.splice(index, 1);
    },
    selectEditTodo: (state, action) => {
      state.todoEdit = action.payload;
    },
    editTodo: (state, action) => {
      const index = state.todoList.findIndex((todo) => todo.id === action.payload.id);
      state.todoList[index] = action.payload;
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListTodo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todoList = action.payload;
      });
  },
});

// create thunk action
export const getListTodo = createAsyncThunk("todos/getListTodo", async () => {
  const response = await fetchTodo();
  return response;
});

export const addOrEditTodo = createAsyncThunk("todos/addOrEditTodo", async (todo, thunkAPI) => {
  if (todo.title.includes("từ bậy")) todo.title = "Công việc vui vẻ";
  thunkAPI.dispatch(addTodo(todo));
});

// export reducer and actions
const { reducer, actions } = todoSlice;
export const { addTodo, deleteTodo, changeStatusTodo, editTodo, selectEditTodo, changeFilter } = actions;
export default reducer;
