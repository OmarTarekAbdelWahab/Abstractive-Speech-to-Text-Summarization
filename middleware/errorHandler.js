const errorHandler = (err, req, res, next) => {
    console.error("Found", err.stack);
    res.status(500).json({ success: false, message: err.message });
  };
  
export default errorHandler;
  