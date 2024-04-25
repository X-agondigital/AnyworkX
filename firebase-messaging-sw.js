importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

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

self.addEventListener("push", function (event) {
  const notificationData = event.data.json();
  const { title, body } = notificationData;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: "/anyworkx_frontend/assets/images/favicon.png",
    })
  );
});

