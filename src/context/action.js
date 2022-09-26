export const addTodoActionCreator = (data) => {
  return {
    type: "ADD_TODO",
    payload: data,
  };
};
export const getApiActionCreator = (data) => {
  return {
    type: "GET_API",
    payload: data,
  };
};
export const clearListPostActionCreator = () => {
  return {
    type: "CLEAR_LIST",
  };
};

export const filterSearchActionCreator = (data) => {
  return {
    type: "FILTER_SEARCH",
    payload: data,
  };
};
