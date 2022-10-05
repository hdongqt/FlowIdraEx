import { combineReducers } from "redux";
import { countdownReducer } from "./countdownReducer";

const reducers = combineReducers({
  countdown: countdownReducer,
});

export default reducers;
