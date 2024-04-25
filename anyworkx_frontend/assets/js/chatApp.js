const url = "https://anyworkx.onrender.com/api/messages/";

const token = localStorage.getItem("token");

// localStorage.setItem('token', token);
if (token) {
  getMessages(token);
} else {
  console.error("Token not found in localStorage");
}

// Function to extract expiration timestamp from the token
function getTokenExpiration(token) {
  const base64Url = token.split('.')[1]; // Extract the payload part of the token
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
  const payload = JSON.parse(atob(base64)); // Decode base64 to JSON object

  // The "exp" claim in the token holds the expiration time in Unix timestamp format
  const expirationTime = payload.exp;

  return expirationTime;
}

// Function to check if access token has expired
function checkAccessTokenExpiry() {  
  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
  const expiryTimestamp = getTokenExpiration(token);

  if (expiryTimestamp < currentTimestamp) {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  }
}

checkAccessTokenExpiry();

document.addEventListener('DOMContentLoaded', checkAccessTokenExpiry);


// Get the messages from the server
function getMessages(token) {
  const messagesDiv = document.getElementById("messages");
  const greetingDiv = document.getElementById('greeting');
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

      const textarea = document.querySelector("textarea");
      messagesDiv.innerHTML = `<div class="message received-message">Drop a message. We will respond to you in a few minutes</div>`;
      data.forEach((message) => {
        const div = document.createElement("div");
        div.innerHTML = message.message;
        div.classList.add("message");

        if (message.recipient === 2) {
          div.classList.add("sent-message");
        } else {
          div.classList.add("received-message");
          // console.log(message.sender);
        }
        messagesDiv.appendChild(div);
      });

      // Scroll to the bottom of the messages
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      textarea.focus();
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

setInterval(() => getMessages(token), 1000);

//script that controls scroll to bottom
const bottomPage = document.querySelector(".down-arrow");
bottomPage.addEventListener("click", scrollToBottom);
function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

window.onload = setTimeout(() => {
  window.scrollTo(0, document.body.scrollHeight);
}, 1000);

function checkAuth() {
  if (!token) {
    window.location.href = "index.html"; 
  }
}

checkAuth();

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html"; 
}
