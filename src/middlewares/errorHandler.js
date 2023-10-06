const errorHandler = (err, req, res, next) => {
  res.json({
    success: false,
    message: err.message || "Something went wrong.",
  });
};

export default errorHandler;
