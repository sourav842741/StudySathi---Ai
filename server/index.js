import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDb from "./utils/connectDb.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import notesRouter from "./routes/genrate.route.js"
import pdfRouter from "./routes/pdf.route.js"
import creditRouter from "./routes/credits.route.js"
import { stripeWebhook } from "./controllers/credits.controller.js"
dotenv.config()




const app = express()

app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

app.use(cors(
    {origin:"https://studysathi-ai-client.onrender.com",
        credentials:true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
))



app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT || 5000
app.get("/",(req,res)=>{
    res.json({message:"ExamNotes AI Backend Running 🚀"})

})

app.get("/api/health", async (req, res) => {
  try {

    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB not connected");
    }

    await mongoose.connection.db.admin().ping();

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


app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter)
app.use("/api/notes", notesRouter)
app.use("/api/pdf", pdfRouter)
app.use("/api/credit",creditRouter)



app.listen(PORT,()=>{
    console.log(`✅ Server running on port ${PORT}`)
    connectDb()
})
