import { Router } from "express";
import authRoutes from "./authRoutes.js";
import projectRoutes from "./projectRoutes.js";
import { authenticate } from "../middleware/authenticate.js";

const routes = Router();

// user auth routes
routes.use("/auth", authRoutes);

// Project routes
routes.use("/project", authenticate, projectRoutes);

export default routes;
