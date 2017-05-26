$(function () {
  let content = $('#content');
  let input = $('#input');
  let status = $('#status');
  
  // nome do usuário local
  let myName = false;
  
  
  // realizar conexão
  let connection = new WebSocket('ws://127.0.0.1:22800');
  connection.onopen = function () {
    status.text('Seu nome:');
  };	
  connection.onerror = function (error) {
    content.html($('<p>', {
      text: 'problema de conexão'
    }));
  };
  
  
  // ao receber mensagem
  connection.onmessage = function (message) {
    // realiza um parse com o json enviado pelo servidor
      var json = JSON.parse(message.data);
	
	// se é a resposta da primeira requisição	
    if (json.type === 'name') { 
      status.text(myName + ': ');
    } 
	else if (json.type === 'history') { // recebimento do histórico
      // adiciona cada mensagem à janela de chat
      for (var i=0; i < json.data.length; i++) {
      addMessage(json.data[i].author, json.data[i].text, new Date(json.data[i].time));
      }
    } 
	else{ // se for uma mensagem unica
      // deixa o usuário escrever outra mensagem
      addMessage(json.data.author, json.data.text, new Date(json.data.time));
    }
  };
  
  
  /**
   * envia mensagem ao precionar ENTER
   */
  input.keydown(function(e) {
    if (e.keyCode === 13) {
      var msg = $(this).val();
      if (!msg) {
        return;
      }
      // envia mensagem
      connection.send(msg);
      $(this).val('');
	  
      // primeira mensagem enviada é o nome
      if (myName === false) {
        myName = msg;
      }
    }
  });
  
  /**
   * adiciona mensagem à janela de chat
   */
  function addMessage(author, message, dt) {
    content.prepend('<p style="font-size:25px; background-color:#aaF;margin-top:12px;"><span style="font-size:25px;background-color:#aaF;margin-top:12px;">'
        + author + '</span> @ ' + (dt.getHours() < 10 ? '0'
        + dt.getHours() : dt.getHours()) + ':'
        + (dt.getMinutes() < 10
          ? '0' + dt.getMinutes() : dt.getMinutes())
        + ': ' + message + '</p>');
  }
});