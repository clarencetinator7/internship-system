const LOGIN_ENDPOINT = "http://127.0.0.1:5000/api/auth/login";

export const login = async ({ identifier, password }) => {
  // send a request.
  const reqBody = {
    identifier,
    password,
  };
  const res = await fetch(LOGIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(reqBody),
  });

  const data = await res.json();

  return data;
};
