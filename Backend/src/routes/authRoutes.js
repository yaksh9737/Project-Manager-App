import { Router } from "express";
import { login, profile, register } from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";
const routes = Router();

// register
routes.post("/register", register);

// login
routes.post("/login", login);

// view user profile
routes.get("/profile", authenticate, profile);

export default routes;
