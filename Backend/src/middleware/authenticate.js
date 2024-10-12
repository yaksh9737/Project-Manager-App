import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import constant from "../config/constant.js";

export const authenticate = async (req, res, next) => {
  // Get token from the headers
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Login required!", success: false });
  }

  // Verify the token
  jwt.verify(token, constant.JWT_SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!", success: false });
    }
    req.user = await userModel.findById(user.userId);
    next();
  });
};
