export const inititalState = {
  listPost: [],
  searchKey: "",
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        listPost: [
          ...state.listPost,
          { id: Math.floor(Math.random() * 100) + 1, title: action.payload },
        ],
      };
    case "GET_API":
      return {
        ...state,
        listPost: action.payload,
      };
    case "CLEAR_LIST":
      return { ...state, listPost: [] };
    case "FILTER_SEARCH":
      return { ...state, searchKey: action.payload };
    default:
      return state;
  }
};
