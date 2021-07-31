import {socketStatusEl, messagesListEl, formEl, messageFieldEl, closeButtonEl} from "./elements.js"
import {getUserName} from "./user.js";

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
        socketStatusEl.innerHTML = 'Connected to: ' + event.currentTarget.url
        socketStatusEl.className = 'open'
        setUserTitle()
    };
}

function getOnMessage() {
    return async function (event) {
        console.log(event);
        const { content, sender } = JSON.parse(event.data);
        messagesListEl.innerHTML += `<li class="received"><span><b>${sender}:</b></span>${content}</li>`
    }
}

function getOnClose() {
    return function () {
        socketStatusEl.innerHTML = 'Disconnected from WebSocket.'
        socketStatusEl.className = 'closed'
    }
}

function getOnSubmit(socket, sender) {
    return function (e) {
        e.preventDefault()
        const content = messageFieldEl.value
        socket.send(JSON.stringify({ content, sender }));
        messagesListEl.innerHTML += `<li class="sent"><span><b>${sender}:</b></span>${content}</li>`
        messageFieldEl.value = ''

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

function setUserTitle() {
    const userTitle = document.querySelector('.welcome-title')
    const name = getUserName()
    userTitle.innerHTML = `${name}`
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
    formEl.onsubmit = getOnSubmit(socket, getUserName())

    // Close the WebSocket connection when the close button is clicked.
    closeButtonEl.onclick = getOnClick(socket)
}
