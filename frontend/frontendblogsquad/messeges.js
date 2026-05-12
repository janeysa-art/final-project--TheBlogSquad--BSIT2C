const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

// Send message
sendBtn.onclick = sendMessage;

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  // fake "real-time typing delay"
  setTimeout(() => {
    botReply(text);
  }, 800);
}

// Add message to chat
function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.classList.add("msg", type);
  msg.textContent = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// AI-like replies
function botReply(userText) {
  let reply = "";

  const lower = userText.toLowerCase();

  if (lower.includes("hello")) {
    reply = "Hi! How can I help you?";
  } 
  else if (lower.includes("how are you")) {
    reply = "I'm just code, but I'm doing great 😄";
  } 
  else if (lower.includes("name")) {
    reply = "I'm your simple chat bot.";
  } 
  else if (lower.includes("time")) {
    reply = "I can't feel time, but your clock is ticking ⏰";
  } 
  else {
    reply = "I see: " + userText;
  }

  addMessage(reply, "bot");
}