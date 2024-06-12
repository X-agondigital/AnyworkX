function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.classList.add("active");
  fetch("https://api.anyworkx.africa/api/login/", {
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
      localStorage.setItem("adminToken", data.access);

      // Redirect to messaging page
      window.location.href = "admin-message/admin-message.html";
      // window.location.href = "/anyworkx_frontend/admin-panel/admin-message/admin-message.html";
    })
    .catch((error) => {
      // console.error("Error during login:", error);
      loadingOverlay.classList.remove("active");
      const alertMessage = document.querySelector("#response-message");
      alertMessage.classList.add("response--error-message");
      alertMessage.textContent =
        "Something went wrong, please refresh and try again";
    });
}
