import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <Form noValidate onSubmit={handleSubmit(submitHandler)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address:</Form.Label>
        <Form.Control
          {...register("email", {
            required: "Email is required",
          })}
          isInvalid={errors.email} // required if you want to show the error message
          type="email"
          placeholder="Enter your Email "
        />
        <Form.Text className="text-muted"></Form.Text>

        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
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
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
              message:
                "Password must contain at least 1 uppercase, 1 lowercase, and 1 number",
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;
