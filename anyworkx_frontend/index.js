const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

// Map of users currently in the chat room
const users = {};

// List of keywords for automated responses
const autoReplies = {
  hi: "Hello!",
  "how are you": "I'm good, thanks for asking!",
  "what is your name": "My name is ChatBot. How can I assist you today?",
};

io.on("connection", (socket) => {
  console.log("a user connected");

  // Handle user join event
  socket.on("join", (user) => {
    users[socket.id] = user;
    console.log(`${user.name} joined the chat`);
    socket.emit(
      "auto-reply",
      "Welcome to the chat room! How can I assist you today?"
    );
  });

  // Handle chat message event
  socket.on("chat message", (message) => {
    console.log(`message: ${message}`);

    // Check if message matches any keyword for automated response
    for (const [keyword, reply] of Object.entries(autoReplies)) {
      if (message.toLowerCase().includes(keyword)) {
        socket.emit("auto-reply", reply);
        return;
      }
    }

    // If message does not match any keyword, broadcast message to other users
    const user = users[socket.id];
    socket.broadcast.emit("chat message", { name: user.name, text: message });
  });

  // Handle user disconnect event
  socket.on("disconnect", () => {
    const user = users[socket.id];
    console.log(`${user.name} left the chat`);
    delete users[socket.id];
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
