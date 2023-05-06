function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("https://anyworkx.onrender.com/api/login/", {
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
      // const token = data.token;
      // localStorage.setItem("token", token);
      // console.log(token);
      console.log("Token:", data.access);
      localStorage.setItem("adminToken", data.access);

      // Redirect to messaging page
      window.location.href = "/admin-panel/admin-message/admin-message.html";
      //   window.location.href = "/anyworkx_frontend/admin-panel/admin-message/admin-message.html";
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
}
