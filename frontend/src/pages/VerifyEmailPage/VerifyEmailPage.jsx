import { useLoaderData } from "react-router-dom";
import { Alert } from "react-bootstrap";
import styles from "./VerifyEmailPage.module.css";
// import { Button, Form } from "react-bootstrap";

const VerifyEmailPage = () => {
  const { success } = useLoaderData();

  return (
    <div className={styles.container}>
      {success ? (
        <Alert variant="success" className={styles.card}>
          <h1>Email Verified</h1>
          <p>
            Your email has been verified. You can now{" "}
            <a href="/login">login to your account</a>
          </p>
        </Alert>
      ) : (
        <Alert variant="danger" className={styles.card}>
          <h1>Email Verification Failed</h1>
          <p>
            Seems like the verification link is invalid or expired. Please try
            again later.
          </p>
        </Alert>
      )}
    </div>
  );
};

export async function VerifyEmailPageLoader({ params }) {
  const { id, code } = params;
  const response = await fetch(
    `http://localhost:3000/api/auth/activate/${id}/${code}`,
    { method: "PUT" }
  );

  return response;
}

export default VerifyEmailPage;
