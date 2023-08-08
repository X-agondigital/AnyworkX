// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getMessaging,
  getToken,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging.js";
// import { NewFactorInstance } from "twilio/lib/rest/verify/v2/service/entity/newFactor";
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
  measurementId: "G-NMEGB8CGLS",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging
  .requestPermission()
  .then(function () {
    console.log("Notification permission granted.");
    // You can now subscribe the user to receive notifications.
  })
  .catch(function (error) {
    console.log("Unable to get permission to notify.", error);
  });

messaging
  .getToken({
    vapidKey:
      "BI03f88Ivb9arL9DuEmkuutxePpJszNS3zvP3oigjPHdGlRLRDBYBlzGH0PkpdmyuKJQu9EnBgoAAnGuP8oc-qg",
  })
  .then(function (currentToken) {
    if (currentToken) {
      // Send the registration token to your server for later use
      console.log("Registration token:", currentToken);
    } else {
      console.log("No registration token available.");
    }
  })
  .catch(function (error) {
    console.log(
      "An error occurred while retrieving registration token.",
      error
    );
  });

messaging.onMessage(function (payload) {
  console.log("Message received. ", payload.notification);
  // Handle the notification payload here
});

