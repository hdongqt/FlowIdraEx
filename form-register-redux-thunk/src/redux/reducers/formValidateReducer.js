import { NEXT_STEP_FORM, BACK_STEP_FORM, CHANGE_ERROR_MESSAGE } from "../constants/formContant";

const initialState = {
  step: 1,
  errorMessage: {
    firstname: "",
    lastname: "",
    age: "",
    address: "",
    gender: "",
    phone: "",
    email: "",
  },
};

export const formValidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_STEP_FORM:
      return {
        ...state,
        step: state.step + 1,
      };
    case BACK_STEP_FORM:
      return {
        ...state,
        step: state.step - 1,
      };
    case CHANGE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: {
          ...state.errorMessage,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
