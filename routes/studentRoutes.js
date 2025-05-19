import express from "express";
const router = express.Router();
import { registerStudent, LoginStudent, getAllStudents } from "../controllers/studentController.js";


router.post("/register", registerStudent);
router.post("/login", LoginStudent);
router.get("/fetch-all", getAllStudents);
export default router;