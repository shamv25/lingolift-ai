const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chips = document.querySelectorAll(".chip");

// ----------------------
// Add Message
// ----------------------

function addMessage(text, sender) {

    const message = document.createElement("div");

    message.className =
        sender === "user"
            ? "message user-message"
            : "message bot-message";

    message.textContent = text;

    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}

// ----------------------
// Typing Animation
// ----------------------

function showTyping() {

    const typing = document.createElement("div");

    typing.className = "typing";

    typing.id = "typing";

    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    chatMessages.appendChild(typing);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}

function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) typing.remove();

}

// ----------------------
// Send Message
// ----------------------

async function sendMessage(customText = null) {

    const message = customText || userInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    userInput.value = "";

    sendBtn.disabled = true;

    showTyping();

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                message

            })

        });

        removeTyping();

        if (!response.ok) {

            throw new Error("Server Error");

        }

        const data = await response.json();

        addMessage(

            data.reply || "Sorry, I couldn't generate a response.",

            "bot"

        );

    }

    catch (error) {

        console.error(error);

        removeTyping();

        addMessage(

            "⚠️ Unable to connect to the server. Please try again.",

            "bot"

        );

    }

    sendBtn.disabled = false;

    userInput.focus();

}

// ----------------------
// Event Listeners
// ----------------------

sendBtn.addEventListener("click", () => {

    sendMessage();

});

userInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        sendMessage();

    }

});

// ----------------------
// Suggestion Buttons
// ----------------------

chips.forEach(chip => {

    chip.addEventListener("click", () => {

        const title = chip.textContent.trim();

        switch (title) {

            case "👋 Greetings":

                sendMessage("Teach me common English greetings.");

                break;

            case "📚 Vocabulary":

                sendMessage("Teach me five useful English words with meanings and examples.");

                break;

            case "✍ Grammar":

                sendMessage("Teach me a simple English grammar lesson.");

                break;

            case "💬 Conversation":

                sendMessage("Let's practice a simple English conversation.");

                break;

        }

    });

});

// ----------------------
// Welcome Message
// ----------------------

window.onload = () => {

    addMessage(

`👋 Welcome to LingoLift AI!

I'm your personal English learning assistant.

I can help you with:

📚 English Vocabulary

✍ Grammar Correction

💬 Daily Conversations

📝 Sentence Formation

🎯 English Practice

Click one of the buttons above or type your own question to begin your English learning journey!`,

        "bot"

    );

};