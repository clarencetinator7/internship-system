import styles from "./VerifyEmailPage.module.css";
import { redirect } from "react-router-dom";
// import { Button, Form } from "react-bootstrap";

const VerifyEmailPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Email Verification Failed</h1>
        <p>
          Seems like the verification link is invalid or expired. Please try
          again later.
        </p>
      </div>
    </div>
  );
};

export async function VerifyEmailPageLoader({ params }) {
  const { id, code } = params;
  const response = await fetch(
    `http://localhost:3000/api/auth/activate/${id}/${code}`,
    { method: "PUT" }
  );
  const data = await response.json();

  if (data.success) {
    return redirect("/login");
  }

  return null;
}

export default VerifyEmailPage;
