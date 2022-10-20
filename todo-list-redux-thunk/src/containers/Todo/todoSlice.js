import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TYPE_FILTER } from "../../utils/typeFilter";
import { createTodoAPI, deleteTodoAPI, fetchTodoAPI, updateTodoAPI } from "../../api/todoAPI";
import * as message from "../../utils/message";

const todoSlice = createSlice({
  name: "todoList",
  initialState: {
    todoEdit: null,
    loadingFetchTodo: false,
    loading: false,
    filter: TYPE_FILTER.ALL,
    todoList: [],
  },
  reducers: {
    selectEditTodo: (state, action) => {
      state.todoEdit = action.payload;
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListTodo.pending, (state) => {
        state.loadingFetchTodo = true;
      })
      .addCase(getListTodo.fulfilled, (state, action) => {
        state.loadingFetchTodo = false;
        state.todoList = action.payload;
      })
      .addCase(addNewTodoFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewTodoFilter.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewTodoFilter.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editTodoFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTodoFilter.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editTodoFilter.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.loading = false;
      });
  },
});

// create thunk action
export const getListTodo = createAsyncThunk("todos/getListTodo", async (thunkAPI, ...params) => {
  try {
    const response = await fetchTodoAPI();
    const data = await response.json();
    if (response.status !== 200) {
      message.error(data.message);
      return thunkAPI.rejectWithValue(data);
    }
    return data;
  } catch (e) {
    message.error(e.message);
    return thunkAPI.rejectWithValue(e);
  }
});

export const addNewTodoFilter = createAsyncThunk("todos/addNewTodoFilter", async (todo, thunkAPI) => {
  try {
    if (todo.title.includes("từ bậy")) todo.title = "Công việc vui vẻ";
    const response = await createTodoAPI(todo);
    const data = await response.json();
    if (response.status !== 201) {
      message.error(data.error.message);
      return thunkAPI.rejectWithValue(data);
    }
    thunkAPI.dispatch(getListTodo());
    message.success(data.message);
    return data;
  } catch (error) {
    message.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editTodoFilter = createAsyncThunk("todos/editTodoFilter", async (todo, thunkAPI) => {
  try {
    if (todo.title.includes("từ bậy")) todo.title = "Công việc vui vẻ";
    const response = await updateTodoAPI(todo);
    const data = await response.json();
    thunkAPI.dispatch(getListTodo());
    if (response.status !== 200) {
      message.error(data.error.message);
      return thunkAPI.rejectWithValue(data);
    }
    thunkAPI.dispatch(getListTodo());
    message.success(data.message);
    return data;
  } catch (error) {
    message.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id, thunkAPI) => {
  try {
    const response = await deleteTodoAPI(id);
    const data = await response.json();
    if (response.status !== 200) {
      message.error(data.error.message);
      return thunkAPI.rejectWithValue(data);
    }
    thunkAPI.dispatch(getListTodo());
    message.success(data.message);
    return data;
  } catch (error) {
    message.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export reducer and actions
const { reducer, actions } = todoSlice;
export const { addTodo, editTodo, selectEditTodo, changeFilter } = actions;
export default reducer;
