import express from "express";
import { saveReport, getReports, deleteOneReport, getOneReport } from "../controllers/reportController.js";
import { sendEmail } from "../controllers/emailController.js";
const router = express.Router();



router.post("/save", saveReport);
router.get("/retrieve", getReports);
router.post("/sendmail", sendEmail);
router.delete("/:id", deleteOneReport);
router.get("/:Emailid", getOneReport);

export default router;