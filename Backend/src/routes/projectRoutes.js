import { Router } from "express";
import {
  createProject,
  deleteProject,
  downloadBulk,
  getMyProjects,
  getProject,
  getProjects,
  makePayment,
  updateProject,
  uploadBulk,
} from "../controllers/projectController.js";
import { upload } from "../models/projectModel.js";
const routes = Router();

// <--------- Normal CRUD operations --------->

// 1.create new project
routes.post("/", createProject);

// 2.Read all projects
routes.get("/all", getProjects);

// 3.Read projects created by spacific user
routes.get("/", getMyProjects);

// 4.Read single project by projecId
routes.get("/:projectId/single", getProject);

// 5.Update project by projecId
routes.patch("/:projectId", updateProject);

// 6.Delete project by projecId
routes.delete("/:projectId", deleteProject);

// 6.Payment project by projecId
routes.patch("/:projectId/payment", makePayment);

// <--------- Bulk operation --------->

// 7.Create bulk projects using csv file
routes.post("/upload/bulk", upload, uploadBulk);

// 8.Download bulk projects in csv file
routes.get("/download/bulk", downloadBulk);

export default routes;
