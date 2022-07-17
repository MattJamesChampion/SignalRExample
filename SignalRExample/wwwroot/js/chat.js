"use strict";

// Sourced from https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr#add-signalr-client-code

var connection = new signalR.HubConnectionBuilder().withUrl("/ChatHubEndpoint").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveChatMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("chatMessagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${user} says ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var chatMessage = document.getElementById("chatMessageInput").value;
    connection.invoke("SendChatMessage", user, chatMessage).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});