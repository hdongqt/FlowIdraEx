import { SET_NUMBER_COUNTDOWN, DECREASE_NUMBER__COUNTDOWN } from "../constants/countdown";

export const setNumber = (value) => async (dispatch) => {
  dispatch({ type: SET_NUMBER_COUNTDOWN, payload: value });
};

export const decrease = () => async (dispatch) => {
  dispatch({ type: DECREASE_NUMBER__COUNTDOWN, payload: 1 });
};
