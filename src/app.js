import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import chatRoute from "./api/chat.js";

const app = express();

// Get the current directory (needed because you're using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "../public")));

// API Routes
app.use("/chat", chatRoute);

// Optional health check route (useful for Railway)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Use Railway's assigned port, or 3000 when running locally
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});