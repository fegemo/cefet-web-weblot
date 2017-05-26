
// porta que roda o servidor
let webSocketsServerPort = 22800;

//importar
let webSocketServer = require('websocket').server;
let http = require('http');


// últimas mensagens
let history = [ ];
// clientes conectados
let clients = [ ];



/**
 * servidor HTTP
 */
let server = http.createServer(function(request, response) {
  // não necessário pois iremos usar um servidor WebSocket
});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Servidor escutando na porta "
      + webSocketsServerPort);
});



/**
 * servidor WebSocket
 */
let wsServer = new webSocketServer({
  // O servidor WebSocket é ligado ao servidor HTTP. Uma requisição WebSocket é uma requisição HTTP aprimorada
  httpServer: server
});


// Ao se conectar ao servidor:
wsServer.on('request', function(request) {
	  console.log((new Date()) + ' Nova conexão de '
		  + request.origin + '.');
		  
	  // aceita conexão
	  let connection = request.accept(null, request.origin); 
	  
	  // adiciona à lista de clientes
	  let index = clients.push(connection) - 1;
	  let userName = false;
	  console.log((new Date()) + ' Conexão aceita.');
	  
	  // envia de volta o histórico de mensagens
	  if (history.length > 0) {
		connection.sendUTF(
			JSON.stringify({ type: 'history', data: history} ));
	  }
	  
	  
	  // quando o usuário envia alguma mensagem
	  connection.on('message', function(message) {
		if (message.type === 'utf8') {
			
		// a primeira mensagem do usuário é o seu nome
		 if (userName === false) {
			// relembrar usuário
			userName = message.utf8Data;
			connection.sendUTF(
				JSON.stringify({ type:'name', data: userName }));
			console.log((new Date()) + ' Usuário: ' + userName);
		  } 
		  else {
			console.log((new Date()) + ' Mensagem recebida de '
						+ userName + ': ' + message.utf8Data);
			
			
			// manter histórico das mensagens enviadas
			let obj = {
			  time: (new Date()).getTime(),
			  text: message.utf8Data,
			  author: userName
			};
			history.push(obj);
			history = history.slice(-100); //corta o buffer de mensagens
			
			// realiza broadcast a todos os usuários conectados
			let json = JSON.stringify({ type:'message', data: obj });
			for (let i=0; i < clients.length; i++) {
			  clients[i].sendUTF(json);
			}
		  }
		}
	  });
	  
	  
	  
	  // ao se desconectar:
	  connection.on('close', function(connection) {
		if (userName !== false) {
		  console.log((new Date()) + " usuário "
			  + connection.remoteAddress + " desconectado.");
		  // remove usuário da lista de clientes
		  clients.splice(index, 1);
		}
	  });
  
});