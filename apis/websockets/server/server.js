import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 4040 });

wss.on("connection", function connection(wsc) {
  console.log("Receive connection!")
  wsc.on("message", (message) => onMessage(message, wsc));
});

function onMessage(message, wsc) {
  console.log("Message received at ", Date.now());
  wss.clients.forEach(function each(client) {
    if (wsc !== client && client.readyState === WebSocket.OPEN) {
      client.send(message.toString("utf8"));
    }
  });
}
