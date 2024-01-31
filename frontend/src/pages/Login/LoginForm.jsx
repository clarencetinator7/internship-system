import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

import { setItem } from "localforage";
import { login } from "../../../services/authQuery";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // set error message manually, used for server errors
  } = useForm();

  const [serverRes, setServerRes] = useState();

  const [isLoading, setIsLoading] = useState(false); // idle | "loading" | "error" | "success"

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    setServerRes(null);
    try {
      setIsLoading(true);
      const body = await login(data);
      console.log(body);

      setIsLoading(false);

      // the response is 422 (input validation error)
      if (!body?.success) {
        const errorObject = body?.error;
        if (errorObject.identifier)
          setError("identifier", {
            type: "server",
            message: errorObject.identifier,
          });
        if (errorObject.password)
          setError("password", {
            type: "server",
            message: errorObject.password,
          });

        return;
      }

      // 400 | 500 http status codes
      if (!body?.status) {
        setServerRes(body?.error?.stack);
      }

      // unverified account
      if (body.success && body?.token === undefined) {
        setServerRes(body?.message);
        return;
      }

      // save the token using localforge
      const token = body.jwt;
      await setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      setServerRes(error?.message);
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit(submitHandler)}>
      {/* displays general error */}
      {serverRes && (
        <p role="alert" className="alert alert-danger">
          {serverRes}
        </p>
      )}

      <Form.Group className="mb-3" controlId="formBasicIdentifier">
        <Form.Label>Email Address:</Form.Label>
        <Form.Control
          {...register("identifier", {
            required: "Email is required",
          })}
          type="email"
          isInvalid={errors.identifier} // required if you want to show the error message
          placeholder="Enter your Email "
        />
        <Form.Text className="text-muted"></Form.Text>

        <Form.Control.Feedback type="invalid">
          {errors.identifier?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          isInvalid={errors.password}
          {...register("password", {
            required: "Password is required",
            minLength: "Password must be at least 8 characters",
            maxLength: "Password must not exceed 20 characters",
            pattern: {
              // regex for password must contain at least 1 uppercase, 1 lowercase,  1 number, and 1 symbol
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message:
                "Password must contain at least 1 uppercase, 1 lowercase,  1 number, and 1 symbol",
            },
          })}
          type="password"
          placeholder="Enter your Password"
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember Me" />
      </Form.Group>

      <Button disabled={isLoading} variant="primary" type="submit">
        {isLoading ? "Loading..." : "Login"}
      </Button>
    </Form>
  );
}

export default LoginForm;
