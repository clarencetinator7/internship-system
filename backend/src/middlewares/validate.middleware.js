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

    res.status(403).json({
      success: false,
      errors: formattedErrors,
    });
  };
};

export { validateMiddleware };
