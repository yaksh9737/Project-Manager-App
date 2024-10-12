import jwt from "jsonwebtoken";
import constatnt from "../config/constant.js";

export const generateToken = async (payload) => {
  const token = await jwt.sign({ userId: payload }, constatnt.JWT_SECRET_KEY, {
    expiresIn: "5h",
  });

  return token;
};
