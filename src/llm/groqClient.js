import { GROQ_API_KEY } from "../config/env.js";

async function callGroq(messages) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages,
    }),
  });

  const data = await response.json();

  console.log("Status:", response.status);
  console.log("Groq response:", JSON.stringify(data, null, 2));

  if (!response.ok) {
    throw new Error(data.error?.message || "Groq API request failed");
  }

  return data.choices[0].message.content;
}

export { callGroq };