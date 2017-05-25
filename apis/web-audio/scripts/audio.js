window.AudioContext = window.AudioContext || window.webkitAudioContext;
context=new AudioContext();
let buffer; let bufferBateria;

window.addEventListener('load', function(e) {
  let request = new XMLHttpRequest();
  request.open("GET",'sounds/song.mp3',true);
  request.responseType= 'arraybuffer';
  request.onload = function(){
      context.decodeAudioData(request.response, function(b){
        buffer = b;
      });
  };
  request.send();

  let requestBuffer = new XMLHttpRequest();
  requestBuffer.open("GET",'sounds/bateria.mp3',true);
  requestBuffer.responseType= 'arraybuffer';
  requestBuffer.onload = function(){
      context.decodeAudioData(requestBuffer.response, function(b){
        bufferBateria = b;
      });
  };
  requestBuffer.send();
});


/** MÚSICA **/
let tmpPausa;
let source;
var gainNode = context.createGain();
gainNode.gain.value = 1.0;

let botaoPlay = document.getElementById('botaoPlay');
botaoPlay.addEventListener('click',function(e) {
  source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.connect (gainNode);
  gainNode.connect(context.destination);
  if (tmpPausa) {
      tmpInicio = Date.now() - tmpPausa;
      source.start(0, tmpPausa / 1000);
  }
  else {
      tmpInicio = Date.now();
      source.start(0);
  }
},false);

let botaoPause = document.getElementById('botaoPause');
botaoPause.addEventListener('click',function(e){
    source.stop(0);
    tmpPausa = Date.now() - tmpInicio;
},false);

let controleVolume =  document.getElementById('volume');
controleVolume.value = 1.0;
controleVolume.addEventListener("input", function(e){
    gainNode.gain.value = controleVolume.value;
}, false);

/**BATERIA**/
let tmpPausa2;
let source2;
var gainNode2 = context.createGain();
gainNode2.gain.value = 1.0;

let botaoPlayBateria = document.getElementById('botaoPlayBateria');
botaoPlayBateria.addEventListener('click',function(e) {
    source2 = context.createBufferSource();
    gainNode2 = context.createGain();
    source2.buffer = bufferBateria;
    source2.loop = true;
    source2.connect(gainNode2);
    gainNode2.connect(context.destination);
    if (tmpPausa2) {
        tmpInicio2 = Date.now() - tmpPausa2;
        source2.start(0, tmpPausa2 / 1000);
    }
    else {
        tmpInicio2 = Date.now();
        source2.start(0);
    }
},false);

let botaoPauseBateria = document.getElementById('botaoPauseBateria');
botaoPauseBateria.addEventListener('click',function(e){
    source2.stop(0);
    tmpPausa2 = Date.now() - tmpInicio2;
},false);

let controleVolumeBateria =  document.getElementById('volumeBateria');
controleVolumeBateria.value = 1.0;
controleVolumeBateria.addEventListener("input", function(e){
    gainNode2.gain.value = controleVolumeBateria.value;
}, false);

//**FILTRO**/

let filtro = context.createBiquadFilter();
let botaoPlayFiltro = document.getElementById('botaoPlayFiltro');
botaoPlayFiltro.addEventListener('click',function(e){
  source.connect(filtro);
  filtro.connect(context.destination);
  filtro.type = 'lowpass';
  filtro.frequency.value = 550.0;
},false);


/**OSCILATOR**/
let oscillator;
let botaoPlayOscilattor = document.getElementById('botaoPlayOscilattor');
botaoPlayOscilattor.addEventListener('click',function(e){
  oscillator = context.createOscillator();
  let gainNode3 = context.createGain();
  oscillator.connect(gainNode3);
  gainNode3.gain.value = 0.7;
  gainNode3.connect(context.destination);
  oscillator.type = 'square'; // quadrada, triangular, senoidal, etc
  oscillator.frequency.value = document.getElementById('frequencia').value;
  oscillator.start();
},false);

let botaoStopOscilattor = document.getElementById('botaoStopOscilattor');
botaoStopOscilattor.addEventListener('click',function(e){
    oscillator.stop(0);
},false);
