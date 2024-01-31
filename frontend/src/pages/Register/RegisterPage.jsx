import { useState } from "react";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const onSubmit = (data) => {
    setIsLoading(true);

    fetch(`http://localhost:3000/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSuccess(data.success);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container className={styles.container}>
      <div className={styles.card}>
        <h1>Register</h1>
        {isSuccess === true && (
          <Alert variant="success">
            Verification link has been sent to your email. Please check your
            inbox to activate your account.
          </Alert>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-2">
            <Form.Group as={Col} controlId="groupUserId">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user ID"
                {...register("userId", { required: true })}
              />
              {errors.userId && (
                <Form.Text className="text-danger">
                  User ID is required
                </Form.Text>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} controlId="groupFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <Form.Text className="text-danger">
                  First Name is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId="groupLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <Form.Text className="text-danger">
                  Last Name is required
                </Form.Text>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} controlId="groupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <Form.Text className="text-danger">
                  Username is required
                </Form.Text>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} controlId="groupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: { value: true, message: "Email is required." },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
              />
              {errors.email && (
                <Form.Text className="text-danger">
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} controlId="groupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <Form.Text className="text-danger">
                  Password is required
                </Form.Text>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} controlId="groupConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password again"
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword && (
                <Form.Text className="text-danger">
                  Password is required
                </Form.Text>
              )}
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterPage;
