const host = "http://127.0.0.1:3300";

const fetchTodoAPI = () =>
  fetch(host + "/api/todos", {
    method: "GET",
  });

const updateTodoAPI = (todo) =>
  fetch(host + "/api/todos/" + todo.id, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

const createTodoAPI = (todo) =>
  fetch(host + "/api/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

const deleteTodoAPI = (id) =>
  fetch(host + "/api/todos/" + id, {
    method: "DELETE",
  });

export { fetchTodoAPI, updateTodoAPI, createTodoAPI, deleteTodoAPI };
