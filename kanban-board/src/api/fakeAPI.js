const fakeEditAPI = (request) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (request.title.length > 0 && request.title.length < 100) {
        resolve({
          message: `Edit ${request.title} Successfully !`,
          data: request,
          isSuccess: true,
        });
      } else {
        reject({
          message: `Edit failure
          Title cannot be longer than 100 characters!`,
          isSuccess: false,
        });
      }
    }, 1000);
  });

const fakeCreateAPI = (request) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (true) {
        resolve({
          message: `Create ${request.title} Successfully !`,
          data: request,
          isSuccess: true,
        });
      } else {
        reject({
          message: "Create failure !",
          isSuccess: false,
        });
      }
    }, 1000);
  });
export { fakeEditAPI, fakeCreateAPI };
