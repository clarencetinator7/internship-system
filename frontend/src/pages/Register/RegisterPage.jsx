import Container from "react-bootstrap/Container";
import { Form, Row, Col, Button } from "react-bootstrap";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <Container className={styles.container}>
      <div className={styles.card}>
        <h1>Register</h1>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>
            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password again"
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterPage;
