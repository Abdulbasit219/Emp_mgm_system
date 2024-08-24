import express from "express";
import {
  createEmployee,
  deleteEmpById,
  getAllEmployee,
  getEmpByID,
  updateEmpByid,
} from "../controller/ControllerFunc.js";
import cloudinaryfileUpload from "../middleware/FileUploader.js";

const routes = express.Router();

routes.get("/", getAllEmployee);

routes.post("/", cloudinaryfileUpload.single("profileImage"), createEmployee);

routes.put("/:id", cloudinaryfileUpload.single("profileImage"), updateEmpByid);

routes.get("/:id", getEmpByID);

routes.delete("/:id", deleteEmpById);

export default routes;
