import express from "express";
const router = express.Router();
import { registerStudent, LoginStudent } from "../controllers/studentController.js";


router.post("/register", registerStudent);
router.post("/login", LoginStudent);

export default router;