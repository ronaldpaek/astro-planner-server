const routeNotFoundHandler = (req, res) => {
  res.json({
    success: false,
    message: "404 Route Not Found",
  });
};

export default routeNotFoundHandler;
