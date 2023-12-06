import express from "express";
import { createTask, deleteTask, getAllMyTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

router.post("/create",isAuthenticated,createTask);

router.get("/all",isAuthenticated,getAllMyTask);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default router;
