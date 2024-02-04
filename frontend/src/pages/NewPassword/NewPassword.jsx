import { Button, Container, Form, Row } from "react-bootstrap";

import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000/api/auth/new-password";
function NewPassword() {
  const { id, code } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [status, setStatus] = useState("idle");

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/${id}/${code}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: data.password, id, code }),
      });
      console.log(response);

      if (response.ok) {
        console.log("Password Changed");
        setStatus("success");
      }

      const dataBody = await response.json();

      console.log(dataBody);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      <Row>
        <h1>Change Password</h1>

        {status === "success" && (
          <p role="alert" className="alert alert-success">
            Your password is sucessfully changed. You can now{" "}
            <a href="/login">login to your account</a>
          </p>
        )}

        {status === "error" && (
          <p role="alert" className="alert alert-danger">
            You have failed to change your password. Please try again.
          </p>
        )}

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
            <Button disabled={isLoading} variant="primary" type="submit">
              {isLoading ? "Loading..." : "Change Password"}
            </Button>
          </Form.Group>
        </form>
      </Row>
    </Container>
  );
}

export default NewPassword;
