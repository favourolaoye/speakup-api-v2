import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connector from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import reportRoute from "./routes/reportRoute.js";

import studentRoute from "./routes/studentRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

connector();

// api routes
app.use("/api/admin", authRoutes);
app.use("/api/report", reportRoute);
app.use("/api/student", studentRoute);

// running the application
app.listen(PORT, "0.0.0.0", (req,res) => {
    console.log(`App listeniing @${PORT}`)
})