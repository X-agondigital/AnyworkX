const form = document.getElementById("subscribe-form");
const responseMessage = document.getElementById("response-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents the default form submission behavior

  const formData = new FormData(form); // Creates a new FormData object with the form data
  const data = {
    email: formData.get("email"),
  }; // Creates a data object from the form data

  const url = "https://anyworkx.onrender.com/api/subscribers/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }; // Creates options for the fetch request

  try {
    const response = await fetch(url, options); // Sends the POST request to the API endpoint
    const responseData = await response.json(); // Parses the response data as JSON

    // Updates the response message
    responseMessage.textContent =
      responseData.status === "success"
        ? "Thank you for subscribing!"
        : responseData.message;
    responseMessage.classList.add("response--success-message");

    const messageDisappear = function () {
      responseMessage.style.display = "none";
    };

    setTimeout(messageDisappear, 5000);

    // Resets the form
    form.reset();
  } catch (error) {
    // console.error(error); // Handles any errors that occur during the fetch request

    // Updates the response message
    responseMessage.textContent =
      "An error occurred while subscribing. Please try again.";
    responseMessage.classList.add("response--error-message");

    for(let i =0; i<chatButton.length; i++){
      chatButton[i].classList.remove("button--loading");
      buttonText[i].style.visibility = "visible";
    }

    const messageDisappear = function () {
      responseMessage.style.display = "none";
    };

    setTimeout(messageDisappear, 5000);
  }
});



function saveUserDetails(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem("userId", data.id);
      sessionStorage.setItem("userName", data.name);
      sessionStorage.setItem("userEmail", email);
      openChatWindow();
    });
}

function openChatWindow() {
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const chatWindow = `
				<div>
					<h3>Welcome ${userName}</h3>
					<ul id="messages"></ul>
					<form onsubmit="sendMessage(event)">
						<input id="messageInput" autocomplete="off" placeholder="Type your message...">
						<button>Send</button>
					</form>
				</div>
			`;
  document.body.innerHTML = chatWindow;
  startChat(userId);
}

function sendMessage(event) {
  event.preventDefault();

  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const userEmail = sessionStorage.getItem("userEmail");
  const message = document.getElementById("messageInput").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      userName: userName,
      userEmail: userEmail,
      message: message,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const messagesList = document.getElementById("messages");
      const messageItem = document.createElement("li");
      messageItem.textContent = `${userName}: ${data.message}`;
      messagesList.appendChild(messageItem);
    });
}

function startChat(userId) {
  const eventSource = new EventSource(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  eventSource.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const messagesList = document.getElementById("messages");
    const messageItem = document.createElement("li");
    messageItem.textContent = `${data.userName}: ${data.message}`;
    messagesList.appendChild(messageItem);
  };
}

//-----TAB PANE CONTROLLER
const tabs = document.querySelectorAll("#tab-box");
const line = document.querySelector(".line");

for (let i = 0; i < tabs.length; i++) {
  line.style.width = tabs[i].offsetWidth + 3 + "px";
}
// tabs.forEach((tab, index) => {
//   tab.addEventListener("click", (e) => {
//     tabs.forEach((tab) => {
//       tab.classList.remove("active");
//     });
//     tab.classList.add("active");

//     const line = document.querySelector(".line");
//     line.style.width = e.target.offsetWidth + 3 + "px";
//     line.style.left = e.target.offsetLeft + "px";

//     all_content.forEach((content) => {
//       content.classList.remove("active");
//     });
//     all_content[index].classList.add("active");
//   });
// });
