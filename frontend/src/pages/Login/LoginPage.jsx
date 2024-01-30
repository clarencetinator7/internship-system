import { Container, Row } from "react-bootstrap";
import LoginForm from "./LoginForm";
import "./LoginPage.css";

function LoginPage() {
  return (
    <Container
      className={`mainContent w-100 d-flex align-items-center justify-content-center border-2 `}
    >
      <Row className={`bg-white p-3 rounded border border 1 w-75`}>
        <LoginForm />
      </Row>
    </Container>
  );
}

export default LoginPage;
