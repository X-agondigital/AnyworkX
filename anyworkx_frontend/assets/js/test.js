// import Pusher from 'pusher-js';

const pusher = new Pusher("your_key", {
  cluster: "eu",
  forceTLS: true,
  // encrypted: true,
});

const channel = pusher.subscribe("notifications");
channel.bind("new-notification", 
function (data) {
  console.log('New notification:', data.message);
  console.log('connection successful');
  // Update the chat interface with the new message
});