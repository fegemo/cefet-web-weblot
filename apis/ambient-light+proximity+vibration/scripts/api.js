// Vibration API + Proximity API + Ambient Light API + Batery Status API
// Ambient Light API
const MIN_COLOR = 50;
const MAX_COLOR = 255;
const INCREMENTO = 5;
const MARGEM_ERRO = 10;
const MAX_LUX = 12844;
const INTERVALO_TROCA_FUNDO = 100;
let blueColor = 240;
let luminosidade = 0;
// Vibration API
const NOTA = 100;
let ni = new Audio('audio/ni.mp3');
let music = new Audio('audio/spamalot_part11_brave SirRobin.mp3');
let proximity = false;

function alteraCorFundo() {
  // Calcula a luminosidade objetivo
  let objetivo = luminosidade * MAX_COLOR;
  // Incrementa ou decrementa se a luminosidade atual não estiver próxima do objetivo
  if (objetivo > blueColor + MARGEM_ERRO) {
    blueColor += INCREMENTO;
  } else if (objetivo < blueColor - MARGEM_ERRO){
    blueColor -= INCREMENTO;
  }
  // Verifica se não ultrapassou os limites da cor azul
  if (blueColor < MIN_COLOR) {
    blueColor = MIN_COLOR;
  } else if (blueColor > MAX_COLOR) {
    blueColor = MAX_COLOR;
  }
  // Zera os contadores
  luminosidade = 0;
  qtd = 0;
  // Altera a cor do fundo
  bodyEl.style.backgroundColor = `rgb(255,255,${blueColor})`;
  window.setTimeout(alteraCorFundo, INTERVALO_TROCA_FUNDO);
}

/*
  Quando ocorre uma mudança na luminosidade de um dispositivo, ele notica o browser,
  que dispara o evento DeviceLightEvent que permite obter a intensidade da luz
*/
window.addEventListener('devicelight', (event) => {
  luminosidade += (event.value / MAX_LUX);
});
/*
  Quando ocorre uma mudança na proximidade de um dispositivo, ele notica o browser,
  que dispara o evento UserProximityEvent que permite saber se existe algum objeto próximo
*/
window.addEventListener('userproximity', (event) => {
  if(event.near && !proximity){
    ni.play();
  }
  proximity = event.near;
});

function iniciaMusica() {
  window.navigator.vibrate([800, 750, NOTA, 1050, NOTA, 450, NOTA, 450, NOTA, 1050, NOTA, 950, NOTA, 950, NOTA, 450, NOTA, 450, NOTA,
  1050, NOTA, 1050, NOTA, 950, NOTA, 450, NOTA, 450, NOTA,
  1050, NOTA, 1050, NOTA, 950, NOTA, 450, NOTA, 450, NOTA,
  950, NOTA, 950, NOTA, 850, NOTA, 450, NOTA, 450, NOTA,
  1050, NOTA, 450, NOTA, 450, NOTA, 450, NOTA, 450, NOTA, 950, NOTA,
  1050, NOTA, 1050, NOTA, 950, NOTA, 450, NOTA, 450, NOTA,
  1050, NOTA, 1050, NOTA, 950, NOTA, 450, NOTA, 450, NOTA,
  950, NOTA, 950, NOTA, 850, NOTA, 450, NOTA, 450, NOTA,
  950, NOTA, 450, NOTA, 450, NOTA, 450, NOTA, 550, NOTA, 950, NOTA,
  1050, NOTA, 1050, NOTA, 1050, NOTA, 1050, NOTA, 1050, NOTA, 950, NOTA, 950, NOTA]);
  music.play();
  window.setTimeout(iniciaMusica, 58000);
}

let bodyEl = document.querySelector('body');
// Se a window não possui essa propriedade, não é possível disparar o evento de alteração na luminosidade
if ('ondevicelight' in window) {
  alteraCorFundo();
}
iniciaMusica();
