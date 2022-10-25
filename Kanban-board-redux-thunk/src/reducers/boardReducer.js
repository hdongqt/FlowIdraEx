import {
  SET_EDIT_TASK_FULFILLED,
  CALL_API_PENDING,
  GET_LIST_TASKS_FULFILLED,
  GET_LIST_USERS_FULFILLED,
  CREATE_TASK_REJECTED,
  GET_LIST_TASKS_REJECTED,
  CHANGE_STATUS_TASK_FULFILLED,
  CHANGE_STATUS_TASK_REJECTED,
  SET_EDIT_TASK_REJECTED,
  EDIT_TASK_REJECTED,
  EDIT_TASK_FULFILLED,
  DELETE_TASK_FULFILLED,
  DELETE_TASK_REJECTED,
} from "../constants/actionType";

const initialState = {
  isLoading: false,
  listTask: [],
  listTaskBackLog: [],
  searchFilter: "",
  taskEditSelected: null,
  listUser: [],
  myUser: null,
};

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALL_API_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_EDIT_TASK_FULFILLED:
      return {
        ...state,
        isLoading: false,
        taskEditSelected: action.payload,
      };
    case SET_EDIT_TASK_REJECTED:
      return {
        ...state,
        isLoading: false,
        taskEditSelected: null,
      };
    case EDIT_TASK_FULFILLED:
      return {
        ...state,
        isLoading: false,
        taskEditSelected: null,
      };
    case EDIT_TASK_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    case GET_LIST_TASKS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        listTask: action.payload,
      };
    case GET_LIST_TASKS_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    case GET_LIST_USERS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        listUser: action.payload,
        myUser: action.payload[1],
      };
    case CREATE_TASK_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    case CHANGE_STATUS_TASK_FULFILLED:
      return {
        ...state,
        isLoading: false,
      };
    case CHANGE_STATUS_TASK_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_TASK_FULFILLED:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_TASK_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
