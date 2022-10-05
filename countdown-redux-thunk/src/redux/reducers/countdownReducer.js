import { SET_NUMBER_COUNTDOWN, DECREASE_NUMBER__COUNTDOWN } from "../constants/countdown";

const initialState = {
  number: 0,
};

export const countdownReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NUMBER_COUNTDOWN:
      return {
        ...state,
        number: action.payload,
      };
    case DECREASE_NUMBER__COUNTDOWN:
      return {
        ...state,
        number: state.number - action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
