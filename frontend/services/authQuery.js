export const login = async (email, password) => {
  const { data } = await fetch("/api/auth/login", { email, password });
  // send a request.
  // if the request is successful, check if the response has a cookie
  // if it has a cookie, set the cookie in the browser
  // if it doesn't have a cookie, check if the response has an email verification code
  // if it has an email verification code, redirect to the email verification page
  // if it doesn't have an email verification code, display the error message
  return data;
};
