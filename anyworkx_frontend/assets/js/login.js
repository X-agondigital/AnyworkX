
function login() {
  // e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("password").value;

  fetch("https://cerdo.pythonanywhere.com/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
   
      console.log("Token:", data.access);
      localStorage.setItem("token", data.access);

      // Redirect to messaging page
      window.location.href = '/chat-window.html';
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
}
