import userModel from "../models/userModel.js";
import { comparePassword, ecryptPassword } from "../utils/ecryptPassword.js";
import { generateToken } from "../utils/generateToken.js";

// register //
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // all fields required
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    // email already registered
    const exitsEmail = await userModel.findOne({ email: email });
    if (exitsEmail) {
      return res
        .status(400)
        .json({ message: "Email already registered!", success: false });
    }

    // password length >= 3
    if (password < 3) {
      return res.status(400).json({
        message: "Password must be at least 3 characters!",
        success: false,
      });
    }

    const encryptPass = await ecryptPassword(password);

    // store user
    const newUser = {
      name,
      email,
      password: encryptPass,
    };

    const createUser = await userModel.create(newUser);

    return res.status(201).json({
      message: "User register successfully.",
      user: { ...createUser._doc, password: "" },
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// login //
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // all fields required
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    // verify email registration
    const verifyUser = await userModel.findOne({ email: email });
    if (!verifyUser) {
      return res
        .status(400)
        .json({ message: "Email not registered!", success: false });
    }

    // verify password
    const verifyPassword = await comparePassword(password, verifyUser.password);
    if (!verifyPassword) {
      return res
        .status(400)
        .json({ message: "invalid credentials!", success: false });
    }

    // genrate token
    const token = await generateToken(verifyUser._id);

    return res.status(200).json({
      message: "Login successfylly.",
      token: token,
      user: { ...verifyUser._doc, password: "" },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// view user profile //
export const profile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    }

    return res.status(200).json({
      user: user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};
