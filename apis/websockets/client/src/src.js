import {socketStatus, messagesList, form, messageField, closeBtn} from "./elements.js"

function getWebSocket() {
    return new WebSocket("ws://localhost:4040");
}

function getOnError() {
    return function (error) {
        console.log('WebSocket Error: ' + error)
    }
}

function getOnOpen() {
    return function (event) {
        socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.url
        socketStatus.className = 'open'
    };
}

function getOnMessage() {
    return async function (event) {
        console.log(event);
        const { content, sender } = JSON.parse(event.data);
        messagesList.innerHTML += `<li class="received"><span><b>${sender}:</b></span>${content}</li>`
    }
}

function getOnClose() {
    return function () {
        socketStatus.innerHTML = 'Disconnected from WebSocket.'
        socketStatus.className = 'closed'
    }
}

function getOnSubmit(socket, sender) {
    return function (e) {
        e.preventDefault()
        const content = messageField.value
        socket.send(JSON.stringify({ content, sender }));
        messagesList.innerHTML += `<li class="sent"><span><b>${sender}:</b></span>${content}</li>`
        messageField.value = ''

        return false
    }
}

function getOnClick(socket) {
    return function (e) {
        e.preventDefault()
        socket.close()
        return false
    }
}

window.onload = function (sender) {

    // Create a new WebSocket.
    const socket = getWebSocket()

    // Handle any errors that occur.
    socket.onerror = getOnError()

    // Show a connected message when the WebSocket is opened.
    socket.onopen = getOnOpen()

    // Handle messages sent by the server.
    socket.onmessage = getOnMessage()

    // Show a disconnected message when the WebSocket is closed.
    socket.onclose = getOnClose()

    // Send a message when the form is submitted.
    form.onsubmit = getOnSubmit(socket, "Vinicius")

    // Close the WebSocket connection when the close button is clicked.
    closeBtn.onclick = getOnClick(socket)
}
