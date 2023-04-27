const url = "https://cerdo.pythonanywhere.com/api/messages/";

const token = localStorage.getItem("token");

// localStorage.setItem('token', token);
if (token) {
  getMessages(token);
} else {
  console.error("Token not found in localStorage");
}

// Get the messages from the server
function getMessages(token) {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      // Display the messages
      const messagesDiv = document.getElementById("messages");
      const textarea = document.querySelector("textarea");
      messagesDiv.innerHTML = "";
      data.forEach((message) => {
        const div = document.createElement("div");
        div.innerHTML = message.message;
        div.classList.add("message");

        if (message.sender === 1) {
          div.classList.add("sent-message");
        } else {
          div.classList.add("received-message");
        }
        messagesDiv.appendChild(div);
      });

      // Scroll to the bottom of the messages
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      textarea.focus();
      textarea.value = "";
      messagesDiv.addEventListener("onfocus", scrollToBottom);
      scrollBottom();
      function scrollBottom() {
        messageDiv.scrollTo(0, messagesDiv.scrollHeight);
      }
    })
    .catch((error) => {
      console.error("Error getting messages:", error);
    });
}

// Send a message to the server
// send message to server
function sendMessage(message) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: message,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Message sent");
      } else {
        console.log("Message failed to send");
      }
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}

// handle form submission
const messageForm = document.getElementById("message-form");
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const messageInput = document.getElementById("message-input");
  const messageBody = messageInput.value.trim();
  if (messageBody) {
    sendMessage(messageBody);
    messageInput.value = "";
  }
});

// Refresh the messages every 5 seconds
setInterval(() => getMessages(token), 1000);


//script that controls scroll to bottom
bottomPage = document.querySelector(".down-arrow");
bottomPage.addEventListener("click", scrollToBottom);
function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}


//This code enables the page to scroll to the bottom of the page onload
window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, document.body.scrollHeight);
  }, 3000);
};
