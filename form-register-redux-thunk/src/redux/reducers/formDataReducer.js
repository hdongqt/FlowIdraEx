import {
  CHANGE_VALUE_FORM,
  SUBMIT_FORM_PENDING,
  SUBMIT_FORM_REJECTED,
  SUBMIT_FORM_FULFILLED,
} from "../constants/formContant";

const initialState = {
  isLoading: false,
  formSubmitted: {},
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
        message: "",
      };
    case SUBMIT_FORM_FULFILLED:
      return {
        ...state,
        isLoading: false,
        formSubmitted: action.payload,
      };
    case SUBMIT_FORM_REJECTED:
      return {
        ...state,
        isLoading: false,
        formSubmitted: {},
      };
    default:
      return state;
  }
};
