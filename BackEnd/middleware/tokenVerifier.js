import User from "../models/User.js";

const tokenVerifier = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: token not found" });
    }
    const user = await User.findByToken(token);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: token not valid" });
    }

    req.user = user;
    console.log("User found: " + user);
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error at token verifier: " + err.message);
  }
};

export default tokenVerifier;