import { combineReducers } from "redux";
import { formDataReducer } from "./formDataReducer";
import { formValidateReducer } from "./formValidateReducer";

const rootReducer = combineReducers({
  formData: formDataReducer,
  formValidate: formValidateReducer,
});

export default rootReducer;
