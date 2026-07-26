import { GROQ_API_KEY } from "../config/env.js";

async function callGroq(messages) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: messages,
    }),
  });
  const data = await response.json();
  const reply = data.choices[0].message.content;
  console.log(reply);
  return reply;
}

export { callGroq };
