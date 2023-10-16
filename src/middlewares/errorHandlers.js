export const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error details for debugging

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong.",
  });
};

export const routeNotFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: "404 Route Not Found",
  });
};
