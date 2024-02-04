import { Button, Container, Form, Row } from "react-bootstrap";
import Header from "../../components/header";
import styles from "./ForgotPassword.module.css";
import { useForm } from "react-hook-form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/authQuery";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // set error message manually, used for server errors
  } = useForm();

  // empty string | loading | error | success
  const [serverRes, setServerRes] = React.useState("");
  const [serverMessage, setServerMessage] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setServerRes("loading");
      const body = await forgotPassword(data);

      console.log(body);
      // the response is 422 (input validation error)
      if (!body?.success) {
        const errorObject = body?.error;
        if (errorObject.identifier)
          setError("identifier", {
            type: "server",
            message: errorObject.identifier,
          });
        setServerRes("");
        return;
      }

      // 400 | 500 http status codes
      if (body.status) {
        setServerRes("error");
        setServerMessage(body?.error?.stack);
        return;
      }

      setServerRes("success");
      setServerMessage(body?.message);
    } catch (error) {
      setServerRes("error");
      setServerMessage("An error occurred, please try again later");
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <Container className={styles.container}>
        <Row className={`border rounded  bg-white p-3 rounded  border-1 w-75`}>
          <h1>Forgot Password</h1>
          <p>
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.{" "}
          </p>
          {serverRes === "error" && (
            <p role="alert" className="alert alert-danger">
              {serverMessage}
            </p>
          )}

          {serverRes === "success" && (
            <p role="alert" className="alert alert-success">
              {serverMessage}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
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

            <Button
              disabled={serverRes === "loading"}
              variant="primary"
              type="submit"
            >
              {serverRes === "loading" ? "Loading..." : "Send Link"}
            </Button>
          </form>

          {serverRes === "success" && (
            <Button variant="link" onClick={() => navigate("/login")}>
              Back to Login
            </Button>
          )}
        </Row>
      </Container>
    </>
  );
}

export default ForgotPassword;
