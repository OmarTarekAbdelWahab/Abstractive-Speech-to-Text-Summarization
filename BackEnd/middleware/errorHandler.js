import { AppError } from "../Errors/errors.js";
import mongoose from "mongoose";

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  // check for mongoose duplicate errors
  if (err.code === 11000) {
    const errors = {};
    for (const key in err.keyValue) {
      errors[key] = { message: `${key} already exists` };
    }
    return res.status(400).json({
      success: false,
      errors,
      message: `Duplicate key error!`,
    });
  }
  
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      errors: err.errors,
      message: "Validation Error",
    });
  }
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
  
export default errorHandler;
  