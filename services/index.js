const URL = "http://localhost:3000/api";
export const register = (data) => {
  return fetch(`${URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const login = (data) => {
  return fetch(`${URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getJobs = () => {
  return fetch(`${URL}/job`, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  });
};
