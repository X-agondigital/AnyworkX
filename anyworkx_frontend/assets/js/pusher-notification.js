  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
  import { getMessaging , getToken } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAJbLi0zA3YypsGH1_3aGdNjB4QSPdvH8s",
    authDomain: "anyworkx.firebaseapp.com",
    projectId: "anyworkx",
    storageBucket: "anyworkx.appspot.com",
    messagingSenderId: "575699814461",
    appId: "1:575699814461:web:bd44b3ec839b0a29460254",
    measurementId: "G-NMEGB8CGLS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


  // Example event handler for a button click
document.getElementById("requestPermissionButton").addEventListener("click", function () {
    if (Notification.permission === "granted") {
      // Permission has already been granted
      console.log("permission granted");
      // Proceed to get the user's registration token
      // (Step 4)
    } else if (Notification.permission !== "denied") {
      // Request permission from the user
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            // Permission has been granted
            // Proceed to get the user's registration token
            // (Step 4)
          } else {
            // Permission has been denied
            // Handle this case accordingly
          }
        })
        .catch((error) => {
          console.error("Error requesting permission:", error);
        });
    }
  });

const messaging = getMessaging(app);
messaging.onTokenRefresh(() => {
  messaging.getToken()
    .then((token) => {
      // Send the registration token to your server
      // for storing and using it to send push notifications
      // to this specific user
      console.log("Registration token:", token);
    })
    .catch((error) => {
      console.error("Error retrieving registration token:", error);
    });
});

  