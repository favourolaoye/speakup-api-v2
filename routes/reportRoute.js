import express from "express";
import { saveReport, getReports } from "../controllers/reportController.js";
const router = express.Router();



router.post("/save", saveReport);
router.get("/retrieve", getReports);

export default router;