const registerAPI = (formData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formData.age > 18) {
        resolve({
          message: `Register ${formData.firstname} ${formData.lastname} Successfully !`,
          isSuccess: true,
        });
      } else {
        reject({
          message: "You are under 18 years old !",
          isSuccess: false,
        });
      }
    }, 1000);
  });
};

export { registerAPI };
