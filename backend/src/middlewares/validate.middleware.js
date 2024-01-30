import { validationResult } from "express-validator";

const validateMiddleware = (schemas) => {
  return async (req, res, next) => {
    await Promise.all(schemas.map((schema) => schema.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    const errors = result.array();

    const formattedErrors = {};
    errors.forEach((error) => {
      formattedErrors[error.path] = error.msg;
    });

    res.status(422).json({
      success: false,
      error: formattedErrors,
    });
  };
};

export { validateMiddleware };
