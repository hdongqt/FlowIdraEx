import {
  CHANGE_ACTIVE_TASK,
  CHANGE_SEARCH_FILTER,
  CHANGE_STATUS_TASK,
  DELETE_TASK_PENDING,
  DELETE_TASK_FULFILLED,
  SET_EDIT_TASK,
  OPEN_FORM_CREATE,
  SUBMIT_FORM_EDIT_FULFILLED,
  SUBMIT_FORM_PENDING,
  SUBMIT_FORM_REJECTED,
  CLOSE_FORM_CREATE,
  SUBMIT_FORM_CREATE_FULFILLED,
} from "../constants/actionType";
import { filter, map } from "lodash";
const initialState = {
  isLoading: false,
  listTask: [
    {
      id: 1,
      title: "Board 1",
      description:
        "Board 1 description Board 1 description Board 1 descriptionBoard 1 description Board 1 description Board 1 description Board 1 description",
      status: "TODO",
      typeIssue: "BUG",
      priority: "MEDIUM",
      reporter: {
        id: 2,
        name: "Alice",
        email: "alice@example.com",
      },
      assignee: {
        id: 2,
        name: "Alice",
        email: "alice@example.com",
      },
    },
    {
      id: 2,
      title: "Board Board Board Board Board Board Board Board Board Board Board Board Board Board 2",
      description: "Board 2 description",
      status: "INPROGRESS",
      typeIssue: "TASK",
      priority: "MEDIUM",
      reporter: {
        id: 2,
        name: "Alice",
        email: "alice@example.com",
      },
      assignee: {},
    },
  ],
  searchFilter: "",
  taskEditSelected: null,
  isOpenFormCreate: false,
};

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: action.payload,
      };
    case DELETE_TASK_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_TASK_FULFILLED:
      return {
        ...state,
        isLoading: false,
        listTask: filter(state.listTask, (task) => task.id !== action.payload),
      };
    case CHANGE_STATUS_TASK:
      return {
        ...state,
        listTask: map(state.listTask, (task) => {
          if (task.id === action.payload.id) {
            return { ...task, status: action.payload.status };
          }
          return task;
        }),
      };
    case CHANGE_ACTIVE_TASK:
      return {
        ...state,
        listTask: map(state.listTask, (task) => {
          if (task.id === action.payload) {
            return { ...task, active: !task.active };
          }
          return task;
        }),
      };
    case SET_EDIT_TASK:
      return {
        ...state,
        taskEditSelected: action.payload,
      };
    case SUBMIT_FORM_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case SUBMIT_FORM_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    case SUBMIT_FORM_EDIT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        listTask: map(state.listTask, (task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }
          return task;
        }),
        taskEditSelected: null,
      };
    case SUBMIT_FORM_CREATE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        listTask: [...state.listTask, action.payload],
      };
    case OPEN_FORM_CREATE:
      return {
        ...state,
        isOpenFormCreate: true,
      };
    case CLOSE_FORM_CREATE:
      return {
        ...state,
        isOpenFormCreate: false,
      };
    default:
      return state;
  }
};
