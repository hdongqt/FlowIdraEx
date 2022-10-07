import {
  BACK_STEP_FORM,
  NEXT_STEP_FORM,
  CHANGE_VALUE_FORM,
  CHANGE_ERROR_MESSAGE,
  SUBMIT_FORM_PENDING,
  SUBMIT_FORM_FULFILLED,
  CLEAR_FORM__MESSAGE,
} from "../constants/formContant";
import { registerAPI } from "../../api/registerAPI";
import { SUBMIT_FORM_REJECTED } from "./../constants/formContant";
export const nextStepForm = () => {
  return { type: NEXT_STEP_FORM };
};

export const backStepForm = () => {
  return { type: BACK_STEP_FORM };
};

export const changeValueForm = (value) => {
  return { type: CHANGE_VALUE_FORM, payload: value };
};

export const changeErrorMessage = (value) => {
  return { type: CHANGE_ERROR_MESSAGE, payload: value };
};

export const submitForm = (value) => async (dispatch) => {
  dispatch({ type: SUBMIT_FORM_PENDING });
  try {
    const response = await registerAPI(value);
    dispatch({
      type: SUBMIT_FORM_FULFILLED,
      payload: {
        message: response.message,
        data: response.data,
      },
    });
  } catch (error) {
    dispatch({ type: SUBMIT_FORM_REJECTED, payload: error.message });
  }
};

export const clearFormMessage = () => {
  return { type: CLEAR_FORM__MESSAGE };
};
