import express from "express";
import { saveReport, getReports } from "../controllers/reportController.js";
import { sendEmail } from "../controllers/emailController.js";
const router = express.Router();



router.post("/save", saveReport);
router.get("/retrieve", getReports);
router.get("/sendmail", sendEmail);

export default router;