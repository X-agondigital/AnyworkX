const socket = new WebSocket('ws://' + window.location.host + '/ws/messages/');

socket.onopen = function(e) {
    console.log('WebSocket connection established.');
};

socket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    console.log('Received message:', data.message);
    // update UI with new message
};

socket.onclose = function(e) {
    console.log('WebSocket connection closed.');
};
