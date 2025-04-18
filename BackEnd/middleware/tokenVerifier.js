import User from "../models/User.js";
import { UnauthorizedError } from "../Errors/errors.js";

const tokenVerifier = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError("Unauthorized: token not found");
    }
    const user = await User.findByToken(token);
    if (!user) {
      throw new UnauthorizedError("Unauthorized: token not valid");
    }

    req.user = user;
    console.log("User found: " + user);
    next();
  } catch (err) {
    next(err);
  }
};

export default tokenVerifier;