import queryString from "query-string";

const host = "http://127.0.0.1:3300";

const fetchTasks = (search = "", type) => {
  const paramString = queryString.stringify({ search: search, type: type });
  return fetch(host + `/api/kanbanboard?${paramString}`, {
    method: "GET",
  });
};

const getTaskById = (taskId) => {
  return fetch(host + `/api/kanbanboard/${taskId}`, {
    method: "GET",
  });
};

const updateTaskAPI = (id, task) => {
  return fetch(host + "/api/kanbanboard/" + id, {
    method: "PUT",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

const deleteTaskAPI = (taskId) => {
  return fetch(host + `/api/kanbanboard/${taskId}`, {
    method: "DELETE",
  });
};

const changeStatusTaskAPI = (taskId, status) => {
  return fetch(host + "/api/kanbanboard/changestatus/" + taskId, {
    method: "PUT",
    body: JSON.stringify({ task_status: status }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

const createTaskAPI = (task) => {
  return fetch(host + "/api/kanbanboard", {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

export {
  fetchTasks,
  getTaskById,
  deleteTaskAPI,
  updateTaskAPI,
  changeStatusTaskAPI,
  createTaskAPI,
};
