import { createContext, useReducer } from "react";
import { todoReducer, inititalState } from "./reducer";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, inititalState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
