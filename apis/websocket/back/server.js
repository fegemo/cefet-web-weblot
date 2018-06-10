process.title = 'web-socket';

// Porta do WebSocket que o node escutará
var webSocketsServerPort = 1337;

// websocket e server http
var webSocketServer = require('websocket').server;
var http = require('http');
var fs = require('fs');

// Arquivos do servidor web
var clients = [ ];
var http_files = {};
[
    ["../front/script.js","application/javascript"],
    ["../front/styles.css","text/css"],
    ["../front/index.html","text/html"]
].forEach(function(fn){
    http_files[fn[0]]={
        content : fs.readFileSync(fn[0]).toString(),
        contentType : fn[1]
    };
});

// Define rotas
http_files["/"]=http_files["../front/index.html"];
http_files["/styles.css"]=http_files["../front/styles.css"];
http_files["/script.js"]=http_files["../front/script.js"];

// Server web simples
var server = http.createServer(function(request, response) {
    var file = http_files[request.url];
    if (file) {
        response.writeHeader(200,{"content-type" : file.contentType});
        response.write(file.content);
        return response.end();
    }
    response.writeHeader(404,{"content-type" : "text/plain"});
    response.write("not found");
    return response.end();

});

// Escuta na porta 1337 para o WebSocket
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

// WebSocket server
var wsServer = new webSocketServer({
    httpServer: server
});

// Callback de mensagem
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    var connection = request.accept(null, request.origin); 
    // Guarda index para retirar da lista de clientes depois
    var index = clients.push(connection) - 1;
    console.log((new Date()) + ' Connection accepted.');
    // Callback de mensagem recebida
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log((new Date()) + ' Received Message ' + message.utf8Data);
        
            // Cria objeto com os dados obtidos de ID e cor
            var sep = message.utf8Data.split("#");
            var obj = {
                id: sep[0],
                cor: sep[1]
            };

            // Transforma em JSON e envia para todos os usuários conectados
            var json = JSON.stringify({ type:'message', data: obj });
            for (var i=0; i < clients.length; i++) {
                clients[i].sendUTF(json);
            }
        }
    });

    // Usuario desconectado
    connection.on('close', function(connection) {
        console.log((new Date()) + " Peer "
            + connection.remoteAddress + " disconnected.");
        // Retira usuário da lista
        clients.splice(index, 1);
    });
});