const fetchTodo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Đi đá banh",
          done: false,
        },
        {
          id: 2,
          title: "Nấu sườn xào chua ngọt",
          done: true,
        },
      ]);
    }, 3000);
  });
};
export default fetchTodo;
