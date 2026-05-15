export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose Bad ObjectID (CastError)
  if (err.name === "CastError") {
    error.message = "Invalid Task ID format";
    error.statusCode = 400;
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    error.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error.statusCode = 400;
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
