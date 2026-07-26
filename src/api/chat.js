import express from "express";
import fs from "fs";
import path from "path";
import { callGroq } from "../llm/groqClient.js";

const router = express.Router();

const systemPrompt = fs.readFileSync(
  path.resolve("src/prompts/systemPrompt.txt"),
  "utf-8"
);

router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessage },
  ];

  const reply = await callGroq(messages);

  let cleanedReply = reply;
  cleanedReply = cleanedReply
    .replace(/Intent.*?\n/g, "")
    .replace(/Level.*?\n/g, "")
    .replace(/Support.*?\n/g, "")
    .replace(/Technical.*?\n/g, "")
    .replace(/Career.*?\n/g, "")
    .trim();

  res.json({ reply: cleanedReply });
});

export default router;
