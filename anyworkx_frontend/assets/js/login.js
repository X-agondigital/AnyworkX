const chatButton = document.querySelectorAll(".send-button");
const buttonText = document.querySelectorAll(".button__text");
const usernameInput = document.getElementById("username-id");
const emailInput = document.getElementById("email-id");
const errorMessage = document.querySelector(".error-message");
const loginSubmitBtn = document.getElementById("submit_btn");

for (let i = 0; i < chatButton.length; i++) {
  chatButton[i].addEventListener("click", () => {
    chatButton[i].classList.add("button--loading");
    buttonText[i].style.visibility = "hidden";
  });
}

loginSubmitBtn.addEventListener("click", login);

function login() {
  const username = usernameInput.value;
  const email = emailInput.value;

  if (username === "" || email === "") {
    errorMessage.textContent = "Username or email can't be empty";

    for (let i = 0; i < chatButton.length; i++) {
      chatButton[i].classList.remove("button--loading");
      buttonText[i].style.visibility = "visible";
    }
    return; // Stop execution if validation fails
  }

  errorMessage.textContent = " ";

  fetch("https://api.anyworkx.africa/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.access);
      window.location.href = "chat-window.html";
    })
    .catch((error) => {
      document.querySelector(".error-message").textContent =
        "Something went wrong, please try again";
      for (let i = 0; i < chatButton.length; i++) {
        chatButton[i].classList.remove("button--loading");
        buttonText[i].style.visibility = "visible";
      }
      console.error("Error during login:", error);
    });
}
