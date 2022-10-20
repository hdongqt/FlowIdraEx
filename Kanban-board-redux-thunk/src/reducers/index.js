import { combineReducers } from "redux";
import { boardReducer } from "./boardReducer";

const rootReducer = combineReducers({
  boardReducer: boardReducer,
});

export default rootReducer;
