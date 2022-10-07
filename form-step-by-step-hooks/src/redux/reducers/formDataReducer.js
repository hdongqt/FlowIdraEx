import {
  CHANGE_VALUE_FORM,
  SUBMIT_FORM_PENDING,
  SUBMIT_FORM_REJECTED,
  SUBMIT_FORM_FULFILLED,
  CLEAR_FORM__MESSAGE,
} from "../constants/formContant";

const initialState = {
  isLoading: false,
  isSubmit: false,
  isSuccess: false,
  message: "",
  form: {
    firstname: "",
    lastname: "",
    age: 0,
    address: "",
    gender: "",
    phone: "",
    email: "",
  },
};

export const formDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VALUE_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload,
        },
      };
    case SUBMIT_FORM_PENDING:
      return {
        ...state,
        isLoading: true,
        isSubmit: false,
        isSuccess: false,
        message: "",
      };
    case SUBMIT_FORM_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isSubmit: true,
        isSuccess: true,
        message: action.payload.message,
      };
    case SUBMIT_FORM_REJECTED:
      return {
        ...state,
        isLoading: false,
        isSubmit: true,
        isSuccess: false,
        message: action.payload,
      };
    case CLEAR_FORM__MESSAGE:
      return {
        ...state,
        isLoading: false,
        isSubmit: false,
        isSuccess: false,
        message: "",
      };
    default:
      return state;
  }
};
