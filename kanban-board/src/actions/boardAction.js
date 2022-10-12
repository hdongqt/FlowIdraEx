import * as message from "../utils/message";
import { fakeEditAPI, fakeCreateAPI, fakeDeleteAPI } from "../api/fakeAPI";
import {
  DELETE_TASK_PENDING,
  DELETE_TASK_REJECTED,
  SUBMIT_FORM_CREATE_FULFILLED,
  CHANGE_SEARCH_FILTER,
  CHANGE_STATUS_TASK,
  EDIT_TASK,
  SET_EDIT_TASK,
  SUBMIT_FORM_PENDING,
  SUBMIT_FORM_REJECTED,
  SUBMIT_FORM_EDIT_FULFILLED,
  OPEN_FORM_CREATE,
  CLOSE_FORM_CREATE,
  DELETE_TASK_FULFILLED,
} from "../constants/actionType";

export const changeSearchFilter = (value) => {
  return { type: CHANGE_SEARCH_FILTER, payload: value };
};

export const changeStatusTask = (id, status) => {
  return {
    type: CHANGE_STATUS_TASK,
    payload: {
      id: id,
      status: status,
    },
  };
};

export const setEditTask = (task) => {
  return { type: SET_EDIT_TASK, payload: task };
};

export const editTask = (task) => {
  return { type: EDIT_TASK, payload: task };
};

export const changeIsOpenFormCreate = (value = "CLOSE") => {
  return {
    type: value === "CLOSE" ? CLOSE_FORM_CREATE : OPEN_FORM_CREATE,
  };
};

export const submitFormEdit = (value) => async (dispatch) => {
  dispatch({ type: SUBMIT_FORM_PENDING });
  try {
    const response = await fakeEditAPI(value);
    dispatch({
      type: SUBMIT_FORM_EDIT_FULFILLED,
      payload: response.data,
    });
    message.success(response.message);
  } catch (error) {
    dispatch({ type: SUBMIT_FORM_REJECTED });
    message.error(error.message);
  }
};

export const submitFormCreate = (value) => async (dispatch) => {
  dispatch({ type: SUBMIT_FORM_PENDING });
  try {
    const response = await fakeCreateAPI(value);
    dispatch({
      type: SUBMIT_FORM_CREATE_FULFILLED,
      payload: response.data,
    });
    dispatch(changeIsOpenFormCreate("CLOSE"));
    message.success(response.message);
  } catch (error) {
    dispatch({ type: SUBMIT_FORM_REJECTED });
    message.error(error.message);
  }
};

export const deleteTask = (value) => async (dispatch) => {
  dispatch({ type: DELETE_TASK_PENDING });
  try {
    const response = await fakeDeleteAPI(value);
    dispatch({
      type: DELETE_TASK_FULFILLED,
      payload: value,
    });
    message.success(response.message);
  } catch (error) {
    dispatch({ type: DELETE_TASK_REJECTED });
    message.error(error.message);
  }
};
