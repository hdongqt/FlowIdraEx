import * as message from "../utils/message";
import { fetchUsers } from "../api/usersAPI";
import {
  fetchTasks,
  getTaskById,
  deleteTaskAPI,
  updateTaskAPI,
  changeStatusTaskAPI,
  createTaskAPI,
} from "../api/tasksAPI";
import {
  CHANGE_SEARCH_FILTER,
  CALL_API_PENDING,
  GET_LIST_TASKS_FULFILLED,
  SET_EDIT_TASK_FULFILLED,
  GET_LIST_USERS_FULFILLED,
  CREATE_TASK_FULFILLED,
  CREATE_TASK_REJECTED,
  GET_LIST_TASKS_REJECTED,
  CHANGE_STATUS_TASK_FULFILLED,
  CHANGE_STATUS_TASK_REJECTED,
  SET_EDIT_TASK_REJECTED,
  EDIT_TASK_FULFILLED,
  EDIT_TASK_REJECTED,
  DELETE_TASK_REJECTED,
  DELETE_TASK_FULFILLED,
} from "../constants/actionType";

export const changeSearchFilter = (value) => {
  return { type: CHANGE_SEARCH_FILTER, payload: value };
};

export const getTasks = (search, status) => async (dispatch) => {
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await fetchTasks(search, status);
    const data = await response.json();
    if (response.status !== 200) {
      message.error(data.error.message);
      dispatch({ type: GET_LIST_TASKS_REJECTED });
    } else {
      dispatch({
        type: GET_LIST_TASKS_FULFILLED,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({ type: GET_LIST_TASKS_REJECTED });
    message.error(error.message);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const response = await fetchUsers();
    const data = await response.json();
    if (response.status !== 200) {
      message.error(data.error.message);
    } else {
      dispatch({
        type: GET_LIST_USERS_FULFILLED,
        payload: data,
      });
    }
  } catch (error) {
    message.error(error.message);
  }
};

export const changeStatusTask = (id, status, type) => async (dispatch, getState) => {
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await changeStatusTaskAPI(id, status);
    const data = await response.json();
    if (response.status !== 200) {
      message.error(data.error.message);
      dispatch({ type: CHANGE_STATUS_TASK_REJECTED });
    } else {
      dispatch({ type: CHANGE_STATUS_TASK_FULFILLED });
      if (type === "backlog") {
        dispatch(getTasks("", "backlog"));
      } else {
        const { searchFilter } = getState().boardReducer;
        dispatch(getTasks(searchFilter, "active"));
      }
    }
  } catch (error) {
    dispatch({ type: CHANGE_STATUS_TASK_REJECTED });
    message.error(error.message);
  }
};

export const setEditTask = (taskId) => async (dispatch) => {
  dispatch({ type: CALL_API_PENDING });
  dispatch(getUsers());
  try {
    const response = await getTaskById(taskId);
    const data = await response.json();
    if (response.status !== 200) {
      message.error(data.error.message);
      dispatch({ type: SET_EDIT_TASK_REJECTED });
    } else {
      dispatch({
        type: SET_EDIT_TASK_FULFILLED,
        payload: data,
      });
    }
  } catch (error) {
    message.error(error.message);
    dispatch({ type: SET_EDIT_TASK_REJECTED });
  }
};

export const submitFormEdit = (id, task, type) => async (dispatch, getState) => {
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await updateTaskAPI(id, task);
    const data = await response.json();
    if (response.status !== 200) {
      message.error(data.error.message);
      dispatch({ type: EDIT_TASK_REJECTED });
    } else {
      message.success(data.message);
      dispatch({ type: EDIT_TASK_FULFILLED });
      if (type === "backlog") {
        dispatch(getTasks("", "backlog"));
      } else {
        const { searchFilter } = getState().boardReducer;
        dispatch(getTasks(searchFilter, "active"));
      }
    }
  } catch (error) {
    message.error(error.message);
    dispatch({ type: EDIT_TASK_REJECTED });
  }
};

export const submitFormCreate = (value, setIsOpenFormCreate) => async (dispatch) => {
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await createTaskAPI(value);
    const data = await response.json();
    if (response.status !== 201) {
      message.error(data.error.message);
      dispatch({ type: CREATE_TASK_REJECTED });
    } else {
      dispatch({
        type: CREATE_TASK_FULFILLED,
        payload: response.data,
      });
      message.success(data.message);
      dispatch(getTasks("", "backlog"));
      setIsOpenFormCreate(false);
    }
  } catch (error) {
    dispatch({ type: CREATE_TASK_REJECTED });
    message.error(error.message);
  }
};

export const deleteTask = (value, type) => async (dispatch, getState) => {
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await deleteTaskAPI(value);
    const data = await response.json();
    if (response.status !== 200) {
      message.error(data.error.message);
      dispatch({ type: DELETE_TASK_REJECTED });
    } else {
      message.success(data.message);
      dispatch({ type: DELETE_TASK_FULFILLED, payload: response.data });
      if (type === "backlog") {
        dispatch(getTasks("", "backlog"));
      } else {
        const { searchFilter } = getState().boardReducer;
        dispatch(getTasks(searchFilter, "active"));
      }
    }
  } catch (error) {
    message.error(error.message);
    dispatch({ type: DELETE_TASK_REJECTED });
  }
};
