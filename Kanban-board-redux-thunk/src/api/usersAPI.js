const host = "http://127.0.0.1:3300";

const fetchUsers = () => {
  return fetch(host + `/api/users`, {
    method: "GET",
  });
};

export { fetchUsers };
