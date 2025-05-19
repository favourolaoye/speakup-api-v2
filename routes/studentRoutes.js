import express from "express";
const router = express.Router();
import { registerStudent, LoginStudent, getAllStudents, getById } from "../controllers/studentController.js";


router.post("/register", registerStudent);
router.post("/login", LoginStudent);
router.get("/fetch-all", getAllStudents);
router.get("/:id", getById);
export default router;