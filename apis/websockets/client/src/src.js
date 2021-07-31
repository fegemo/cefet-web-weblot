import {socketStatus, messagesList, form, messageField, closeBtn} from "./elements.js"

function getWebSocket() {
    return new WebSocket('wss://echo.websocket.org')
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
    return function (event) {
        const message = event.data
        messagesList.innerHTML += '<li class="received"><span>Received:</span>' + message + '</li>'
    }
}

function getOnClose() {
    return function () {
        socketStatus.innerHTML = 'Disconnected from WebSocket.'
        socketStatus.className = 'closed'
    }
}

function getOnSubmit(socket) {
    return function (e) {
        e.preventDefault()

        // Retrieve the message from the textarea.
        const message = messageField.value

        // Send the message through the WebSocket.
        socket.send(message)

        // Add the message to the messages list.
        messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message + '</li>'

        // Clear out the message field.
        messageField.value = ''

        return false
    }
}

function getOnClick(socket) {
    return function (e) {
        e.preventDefault()
        // Close the WebSocket.
        socket.close()
        return false
    }
}

window.onload = function () {

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
    form.onsubmit = getOnSubmit(socket)

    // Close the WebSocket connection when the close button is clicked.
    closeBtn.onclick = getOnClick(socket)
}
