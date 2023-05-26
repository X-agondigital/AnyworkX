function login() {
  // e.preventDefault();
  const username = document.getElementById("username-id").value;
  const email = document.getElementById("email-id").value;

  fetch("https://anyworkx.onrender.com/api/register/", {
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
      // console.log("Token:", data.access);
      localStorage.setItem("token", data.access);

      // Redirect to messaging page
      window.location.href = "/anyworkx_frontend/chat-window.html";
      // window.location.href = "/chat-window.html";
    })
    .catch((error) => {
      document.querySelector(".error-message").textContent =
        "Something went wrong, please try again";
      console.error("Error during login:", error);
    });
}
