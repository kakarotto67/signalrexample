"use strict";

// Disable send button until connection is established
if (document.getElementById("sendButton")) {
  document.getElementById("sendButton").disabled = true;
}

// Setup SignalR connection
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//---------------- This is how to set up an event handler ----------------//

// ReceiveMessage was mentioned in SignalR ChatHub.cs SendMessage method
// It receives message from a SignalR hub
connection.on("ReceiveMessage", function(user, message) {
  var encodedMsg = user + " says " + encodeURI(message);

  // Create li element with received message and append it to messages list
  var li = document.createElement("li");
  li.textContent = encodedMsg;
  document.getElementById("messagesList").appendChild(li);
});

//---------------- This is how to set up additional connection-related stuff ----------------//

// Enabled send button after connection started or show error in case of failure
connection
  .start()
  .then(function() {
    document.getElementById("sendButton").disabled = false;
  })
  .catch(function(error) {
    return console.error(error.toString());
  });

//---------------- This is how to set up an event emitter ----------------//

// Add button click handler to send button
document.getElementById("sendButton").addEventListener("click", function(event) {
  // Send message to SignalR hub via SendMessage method
  var user = document.getElementById("userInput").value;
  var message = document.getElementById("messageInput").value;

  // SendMessage is defined in SignalR hub
  connection.invoke("SendMessage", user, message).catch(function(err) {
    return console.error(err.toString());
  });
  event.preventDefault();
});
