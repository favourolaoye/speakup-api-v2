import express from "express";
const router = express.Router();
import { registerAdmin, LoginAdmin } from "../controllers/authController.js";


router.post("/register", registerAdmin);
router.post("/login", LoginAdmin)

export default router;