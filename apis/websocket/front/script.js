var color = "rgb(255, 255, 255)";

var quadrado = document.getElementsByClassName('quadrado');

// Verifica a possibilidade de usar WebSockets
window.WebSocket = window.WebSocket || window.MozWebSocket;

// Caso não exista a possibilidade de usar WebSocket, exibe um alerta
if (!window.WebSocket) {
    console.log("Browser sem surporte para WebSockets.");
}

// Abre conexão
var connection = new WebSocket('ws://127.0.0.1:1337');


for (var i = quadrado.length - 1; i >= 0; i--)
{
	quadrado[i].onclick = function(elemento)
	{
        // Se é um quadrado de cor
		if(elemento.originalTarget.className.includes("pixel") === false)
		{
			color = window.getComputedStyle(elemento.originalTarget, null).backgroundColor;
		}
        // Se é um quadrado a ser pintado
		else
		{
            // Se o browser estiver conectado à internet
			if(navigator.onLine)
			{
                // Colore o elemento pela cor vigente
				elemento.originalTarget.style.backgroundColor = color;
                // Envia ID do quadrado juntamente com a cor
				connection.send(elemento.originalTarget.id + "#" + color);
			}
		}
	};
};

connection.onmessage = function (message) {
    try
    {
        // Faz parse do JSON recebido pelo servidor via WebSocket
        var json = JSON.parse(message.data);
    }
    catch (e)
    {
        // Erro no parser do JSON
        console.log("Erro ao realizar o parser do JSON: ", message.data);
        return;
    }
    // Identifica o elemento pelo ID recebido pelo JSON
	let elemento = document.getElementById(json.data.id);
    // Colore o elemento pela cor recebida pelo JSON
	elemento.style.backgroundColor = json.data.cor;
};