import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDb from "./utils/connectDb.js";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/genrate.route.js";
import pdfRouter from "./routes/pdf.route.js";
import creditRouter from "./routes/credits.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";

import { stripeWebhook } from "./controllers/credits.controller.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// ================= STRIPE WEBHOOK =================
app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// ================= MIDDLEWARE =================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://studysathi-ai-client.onrender.com",
  ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL] : []),
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.json({
    message: "ExamNotes AI Backend Running 🚀",
  });
});

// ================= HEALTH CHECK =================
app.get("/api/health", async (req, res) => {
  try {

    // MongoDB connection check
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB not connected");
    }

    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("Database unavailable");
    }

    // Ping MongoDB
    await db.admin().ping();

    res.status(200).json({
      status: "ok",
      db: "connected",
      timestamp: new Date().toISOString(),
    });

  } catch (error) {

    res.status(500).json({
      status: "error",
      db: "disconnected",
      error: error.message,
    });

  }
});

// ================= ROUTES =================
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credit", creditRouter);

// ================= START SERVER =================
const startServer = async () => {
  try {

    await connectDb();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (error) {

    console.log("❌ Database connection failed:", error);

  }
};

startServer();