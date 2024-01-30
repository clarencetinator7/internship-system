const errorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    status: false,
    error: {
      message: err.message,
      stack: process.env.ENVIRONMENT === "PRODUCTION" ? null : err.stack,
    },
  });
};

export { errorMiddleware };
