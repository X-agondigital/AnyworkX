function getTokenExpiration(adminToken) {
  const adminToken = localStorage.getItem("adminToken");
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


function logout() {
  localStorage.removeItem("adminToken");
  // Redirect to the login page
  window.location.href = "../admin-login.html"; // Replace with your login page URL
}

document.querySelector("#logout").addEventListener("click", logout);
