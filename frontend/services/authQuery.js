const API_ENDPOINT = "http://127.0.0.1:5000/api/auth";

export const login = async ({ identifier, password }) => {
  const reqBody = {
    identifier,
    password,
  };
  const res = await fetch(`${API_ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // adds the cookies to the request.
    credentials: "include",
    body: JSON.stringify(reqBody),
  });

  const data = await res.json();

  return data;
};

export const forgotPassword = async (email) => {
  const res = await fetch(`${API_ENDPOINT}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // adds the cookies to the request.
    credentials: "include",
    body: JSON.stringify(email),
  });

  const data = await res.json();
  return data;
};
