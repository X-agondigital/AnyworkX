// import Pusher from 'pusher-js';

// const pusher = new Pusher("4329042c17d3987f58c2", {
//   cluster: "eu",
//   // encrypted: true,
// });

// Pusher.log = function (msg) {
//   console.log(msg);
// }
// pusher.connection.bind('state_change', stateChanged);
// function stateChanged(change){
//   document.getElementById('connection_status').value= (change.current)
// }
// const channel = pusher.subscribe("notifications");
// channel.bind("new-notification", 
// function (data) {
//   console.log('connection successful');
//   console.log('New notification:', data.message);
//   // Update the chat interface with the new message
// });

// const socket = new WebSocket('ws://anyworkx.onrender.com/api/ws/messages/');

// socket.onopen = function (e) {
//     console.log('WebSocket connection established.');
// };

// socket.onmessage = function (e) {
//     const data = JSON.parse(e.data);
//     console.log('Received message:', data.message);
//     // Update UI with new message
//     getMessages(data.userId);
// };

// socket.onclose = function (e) {
//     console.log('WebSocket connection closed.');
// };


const sidebar = document.querySelector(".sidebar");
const sidebarBtn = document.querySelector(".hamburger-wrap");
const hamburgerMenu = document.querySelector(".hamburger-icon");

sidebarBtn.addEventListener("click", function () {
  console.log("button clicked");
  sidebar.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    hamburgerMenu.classList.remove("ri-menu-fold-line");
    hamburgerMenu.classList.add("ri-menu-unfold-line");
  } else {
    hamburgerMenu.classList.add("ri-menu-fold-line");
    hamburgerMenu.classList.remove("ri-menu-unfold-line");
  }
});

const usersList = "https://anyworkx.onrender.com/api/admin/list/users/";
const messageUrl = "https://anyworkx.onrender.com/api/messages/";
const adminMessageUrl = "https://anyworkx.onrender.com/api/admin/messages/";

// get admin token from localStorage
const adminToken = localStorage.getItem("adminToken");

function getTokenExpiration(adminToken) {
  const base64Url = adminToken.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(atob(base64));

  const expirationTime = payload.exp;

  return expirationTime;
}

function checkAccessTokenExpiry() {
  if (!adminToken) {
    window.location.href = '../admin-login.html';
    return;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
  const expiryTimestamp = getTokenExpiration(adminToken);

  if (expiryTimestamp < currentTimestamp) {
    // Access token has expired, perform logout actions
    localStorage.removeItem('adminToken');
    window.location.href = '../admin-login.html';
  }
}

// Call the checkAccessTokenExpiry function when needed, such as on page load or after a certain time interval
checkAccessTokenExpiry();
document.addEventListener('DOMContentLoaded', checkAccessTokenExpiry);

const userList = document.getElementById("user-list");

fetch(usersList)
  .then((response) => response.json())
  .then((data) => {
    // Get the first user from the list
    const firstUser = data[0];

    // Fetch and display the messages for the first user
    getMessages(firstUser.id);

    // Loop through the remaining users and create list items
    data.forEach((user) => {
      const listItem = document.createElement("li");
      const usernameElement = document.createElement("span");
      const emailElement = document.createElement("span");

      usernameElement.textContent = user.username;
      emailElement.textContent = user.email;
      emailElement.style.fontWeight = 600;

      listItem.appendChild(usernameElement);
      listItem.appendChild(emailElement);

      listItem.addEventListener("click", () => {
        // Clear selected state from other list items
        const selectedItems = document.querySelectorAll(".user-list .selected");
        selectedItems.forEach((item) => item.classList.remove("selected"));

        // Add selected state to the clicked item
        listItem.classList.add("selected");

        // Fetch and display the messages for the selected user
        getMessages(user.id);
      });

      userList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching users:", error);

    const alertMessage = document.querySelector("#response-message");
      alertMessage.classList.add("response--error-message");
      alertMessage.textContent = "Unable to fetch users, please try again";

      const messageDisappear = function () {
        alertMessage.style.display = "none";
      };

      setTimeout(messageDisappear, 5000);
  });


// get selected user ID from dropdown
// const userId = document.getElementById('user-dropdown').value;

// div.innerHTML = `<strong>${message.sender}: </strong>${message.message}`;

function getMessages(userId) {
  fetch(`${adminMessageUrl}${userId}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      // Display the messages for the selected user
      const messagesDiv = document.getElementById("messages");
      messagesDiv.innerHTML = "";
      data.forEach((message) => {
        const sender = message.sender === 2 ? "You" : message.sender;
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");
        if (message.sender === 2) {
          messageContainer.classList.add("admin-message");
        } else {
          messageContainer.classList.add("user-message");
        }
        const messageText = document.createElement("span");
        messageText.innerHTML = `<strong>${sender}: </strong>${message.message}<br>`;
        messageContainer.appendChild(messageText);
        messagesDiv.appendChild(messageContainer);
      });

      // Scroll to the bottom of the messages
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      // set the user-id field value
      const userIdField = document.getElementById("user-id");
      userIdField.value = userId;

      window.onload = setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 1000);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error getting messages:", error);

      const alertMessage = document.querySelector("#response-message");
      alertMessage.classList.add("response--error-message");
      alertMessage.textContent = "Unable to get messages, please try again";

      const messageDisappear = function () {
        alertMessage.style.display = "none";
      };

      setTimeout(messageDisappear, 5000);
    });
}

function sendMessage(message, userId) {
  fetch(`https://anyworkx.onrender.com/api/admin/messages/reply/${userId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      message: message,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Reply sent");

        // refresh the messages for the selected user
        setInterval(() => getMessages(userId), 1000);
        // getMessages(userId);
      } else {
        console.log("Reply failed to send");
      }
    })
    .catch((error) => {
      console.error("Error sending message:", error);

      const alertMessage = document.querySelector("#response-message");
      alertMessage.classList.add("response--error-message");
      alertMessage.textContent = "Error occured while sending message, please try again";

      const messageDisappear = function () {
        alertMessage.style.display = "none";
      };

      setTimeout(messageDisappear, 5000);
    });
}

const replyForm = document.getElementById("reply-form");
replyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const messageInput = document.getElementById("reply-message");
  const messageBody = messageInput.value.trim();
  const userId = document.getElementById("user-id").value;

  if (messageBody && userId) {
    sendMessage(messageBody, userId);
    messageInput.value = "";
  }
});
