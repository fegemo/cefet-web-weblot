import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({  port: 4040 });
const connections = []

wss.on('connection', function connection(ws) {
  ws.on('message', onMessage);
  connections.push(ws);
});

function onMessage(message) {
  console.log('Message received at ', Date.now());
  connections.forEach((ws) => ws.send(message));
}

