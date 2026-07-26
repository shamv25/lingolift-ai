import express from "express";
import path from "path";
import chatRoute from "./api/chat.js";

const app = express();

app.use(express.json());
app.use(express.static(path.resolve("public")));

app.use("/chat", chatRoute);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
