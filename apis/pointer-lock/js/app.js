//Busca pelo ID do elemento da tela que terá a função Pointer Lock
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//Aciona o evento quando carregar a página
window.addEventListener('load', eventWindowLoaded, false);

//Funçaõ que realiza a requesição ao navegador da API Pointer Lock
canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

//Chamada da função Pointer Lock ao clicar no elemento de Tela
canvas.onclick = function() 
{
  canvas.requestPointerLock();
}

//Aciona a função lockChangeAlert quando muda o estado do Pointer Lock, ou seja, quando o usuário faz a chamada do Pointer Lock ou quando pressiona ESC para sair do Pointer Lock
document.addEventListener('pointerlockchange', lockChangeAlert, false);

//Responsável pela inserção/retirada de um evento pela movimentação do Mouse que chama a função CanvasLoop
function lockChangeAlert() 
{
  if(document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) 
  {
    document.addEventListener("mousemove", canvasLoop, false);
  } 
  else 
  {
    document.removeEventListener("mousemove", canvasLoop, false);
  }
}

//Coordenadas iniciais do Bloco Vermelho
let x = 50;
let y = 50;

//Coordenadas do alvo
let xp;
let yp;

//Contagem de pontos
let points = -50;

//Executa inicialmente o desenho principal e o alvo do Aplicativo
function eventWindowLoaded() 
{
  pontos();
  canvasDraw();
}

//Responsável pela entrega de números aleatórios requesitados
function random(limit)
{
	return Math.floor(Math.random() * limit);
}

//Realiza o desenho da movimentação do Bloco Vermelho e dos alvos
function canvasDraw() 
{
  //Os quatro IFs garantem que o bloco vermelho não ultrapassará o seu limite estabelecido pelo retângulo branco
  if(x > canvas.clientWidth-40) 
  {
    x = canvas.clientWidth-40;  
  }
  if(y > canvas.clientHeight-40) 
  {
    y = canvas.clientHeight-40;  
  }  
  if(x < 0) 
  {
    x = 0;  
  }
  if(y < 0) 
  {
    y = 0;  
  }

  //Define a área de contato do bloco com o alvo para contar os pontos e preparar as novas coordenadas do próximo alvo
  if(x<=xp&&x>=xp-40&&y<=yp&&y>=yp-40)
  {
	  pontos();
  }
  
  //Define o fundo Cinza do canvas
  ctx.fillStyle = "#f1f1f1";
  ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);


  //Preenche o Quadrado de vermelho na posição presente
  ctx.beginPath();
  ctx.fillStyle = "#f00";
  ctx.fillRect(x,y,40,40)
  ctx.fill();
  
  //Preenche de preto e insere o alvo na coordenada aleatória
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.arc(xp, yp, 5, 0, 2*Math.PI);
  ctx.fill();
}  

//Atualiza as novas coordenadas aleatórias do novo Alvo e acrescenta a pontuação do jogador por ter adquirido o alvo 
function pontos()
{
	xp = random(canvas.clientWidth+1);
	yp = random(canvas.clientHeight+1);
	points = points + 50;
}


  //Insere p dentro de Body no final para que seja mostrado ao usuário sua pontuação
  const tracker = document.createElement('p');
  const body = document.querySelector('body');
  body.appendChild(tracker);
  tracker.style.marginLeft = '27%';
  
//Garante o rastreio da posição do Mouse, o desenho constante do Bloco e alvos e divulga a pontuação atual do usuário
function canvasLoop(e) 
{
  //Realiza a leitura do Mouse nas coordenadas X e Y com base no estado anterior
  let movementX = e.movementX || e.mozMovementX || 0;
  let movementY = e.movementY || e.mozMovementY || 0;

  //Acrescenta e salva a nova coordenada do Quadrado Vermelho
  x += movementX;
  y += movementY; 

  //Desenha na tela do usuário com a nova localização do Quadrado e os alvos 
  canvasDraw();

  //Imprime na tela do usuário a sua pontuação
  tracker.innerHTML = "Pontos: " + points;
}
