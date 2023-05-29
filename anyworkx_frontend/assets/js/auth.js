function checkAuth() {
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) {
    // Admin is not logged in, redirect to login page
    window.location.href = "../admin-login.html"; // Replace with your login page URL
  }
}

checkAuth();


function logout() {
  localStorage.removeItem("adminToken");
  // Redirect to the login page
  window.location.href = "../admin-login.html"; // Replace with your login page URL
}

document.querySelector("#logout").addEventListener("click", logout);
