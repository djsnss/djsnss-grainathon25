import express from "express";
import dotenv from "dotenv";
import cors from "cors";          
import routes from "./routes/mainR.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());                  
app.use(express.json());

// Routes
app.use("/grain-a-thon2025", routes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    error: "Internal server error",
    message: error.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});