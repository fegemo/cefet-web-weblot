
console.log("inicio");
let AudioCtx = window.AudioContext || window.webkitAudioContext
let audioCtx = new AudioContext();

//Stero
let channels = 2;
let frameCount = audioCtx.sampleRate;

let gainNode = audioCtx.createGain();
let compressor = audioCtx.createDynamicsCompressor();
let synthDelay = audioCtx.createDelay();
let distortion = audioCtx.createWaveShaper();
let reverb = audioCtx.createConvolver();

var irRRequest = new XMLHttpRequest();

irRRequest.open("GET", "audioImpulse.mp3", true);
irRRequest.responseType = "arraybuffer";
irRRequest.onload = function() {
    audioCtx.decodeAudioData( irRRequest.response, 
        function(buffer) { reverb.buffer = buffer; } );
}
irRRequest.send();



distortion.curve = makeDistortionCurve(400);
distortion.oversample = '4x';

synthDelay.delayTime.value = 1;

compressor.threshold.value = -80;
compressor.knee.value = 40;
compressor.ratio.value = 12;
compressor.attack.value = 0;
compressor.release.value = 0.25;	

const numeroNodos = 7;

const tela = document.querySelector('#sobrepor-tudo');
const delayValue = document.querySelector('#delay-value');
const playButton = document.querySelector('#play-button');
const compressorButton = document.querySelector('#compressor-button');
const distortionButton = document.querySelector('#distortion-button');
const reverbButton = document.querySelector('#reverb-button');
const volumeControl = document.querySelector('[data-action="volume"]');
const delayButton = document.querySelector('#delay-button');
const delayButtonIncrease = document.querySelector('#delay-button-increase');
const delayButtonDecrease = document.querySelector('#delay-button-decrease');

const selecionadoVibrar= document.querySelector('#hqq');

const audioElement = document.querySelector('audio');
const track = audioCtx.createMediaElementSource(audioElement);

				   //  0 ,  1 ,  2  , 3 ,   4   , 5  , 6
let vetorBooleano = [true,true,false,false,false,false,true] // representa se deve ou não usar o elemento indicado no mesmo indice do vetor abaixo.
let nodos = [track,gainNode,compressor,synthDelay,distortion,reverb,audioCtx.destination]

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let bubbleArray=[];

console.log("terminou declarar variaveis");
ligar();
drawOnScreen();

console.log("funções");
playButton.addEventListener('click',function(){
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	if (this.dataset.playing === 'false') {
		playButton.innerHTML="Pause";
		audioElement.play();
		this.dataset.playing = 'true';
	// if track is playing pause it
	} else if (this.dataset.playing === 'true') {
		playButton.innerHTML="Play";
		audioElement.pause();
		this.dataset.playing = 'false';
	}

	let state = this.getAttribute('aria-checked') === "true" ? true : false;
	this.setAttribute( 'aria-checked', state ? "false" : "true" );
},false);

audioElement.addEventListener('ended', () => {
	playButton.dataset.playing = 'false';
	playButton.innerHTML="Play";
	playButton.setAttribute( "aria-checked", "false" );
}, false);

volumeControl.addEventListener('input', function(){
	gainNode.gain.value = this.value;
	}, false);
	
compressorButton.addEventListener('click',function(){
	let active = compressorButton.getAttribute('data-active');
	if(active == 'true') {
	  	compressorButton.setAttribute('data-active', 'false');
	    compressorButton.innerHTML = 'Remove compression';
	    addTelaPreta(true);
	    vetorBooleano[2]=true;
	} else if(active == 'false') {
		compressorButton.setAttribute('data-active', 'true');
    	compressorButton.innerHTML = 'Add compression';
    	addTelaPreta(false);
    	vetorBooleano[2]=false;
	}
	mudançaNodos(2);
},false);

distortionButton.addEventListener('click',function(){
	let active = distortionButton.getAttribute('data-active');
	if(active == 'true') {
	  	distortionButton.setAttribute('data-active', 'false');
	    distortionButton.innerHTML = 'Remove distortion';
	    addVibrar(true);
	    vetorBooleano[4]=true;

	} else if(active == 'false') {
		distortionButton.setAttribute('data-active', 'true');
    	distortionButton.innerHTML = 'Add distortion';
    	addVibrar(false);
    	vetorBooleano[4]=false;
	}
	mudançaNodos(4);
},false);

reverbButton.addEventListener('click',function(){
	let active = reverbButton.getAttribute('data-active');
	if(active == 'true') {
	  	reverbButton.setAttribute('data-active', 'false');
	    reverbButton.innerHTML = 'Remove reverb';

	    vetorBooleano[5]=true;
	} else if(active == 'false') {
		reverbButton.setAttribute('data-active', 'true');
    	reverbButton.innerHTML = 'Add reverb';

    	vetorBooleano[5]=false;
	}
	mudançaNodos(5);
},false);

delayButton.addEventListener('click',function(){
	let active = delayButton.getAttribute('data-active');
	if(active == 'true') {
		delayButton.setAttribute('data-active','false');
		delayButton.innerHTML = "Remove Delay";
		vetorBooleano[3]=true;
		delayButtonDecrease.setAttribute("disabled", "disabled");
		delayButtonIncrease.setAttribute("disabled", "disabled");
		addBarrelRoll(true);

	}else if(active == 'false'){
		delayButton.setAttribute('data-active', 'true');
		delayButton.innerHTML = "Add Delay";
		delayButtonIncrease.removeAttribute("disabled");
		delayButtonDecrease.removeAttribute("disabled");
		vetorBooleano[3]=false;
		addBarrelRoll(false);
	}
	mudançaNodos(3);
},false);

delayButtonIncrease.addEventListener('click',function(){
	if(!delayButtonIncrease.disabled){
		synthDelay.delayTime.value += 1;
		delayValue.innerHTML = synthDelay.delayTime.value;
		console.log("ERA PARA IMRPIMIR PORRA!");

		console.log(synthDelay.delayTime.value);
	}
});

delayButtonDecrease.addEventListener('click',function(){
	if(!delayButtonDecrease.disabled){
		if(synthDelay.delayTime.value += -1 > 0){
			synthDelay.delayTime.value += -1;
			delayValue.innerHTML = synthDelay.delayTime.value;
			console.log(synthDelay.delayTime.value);
		}
	}
});

function delayAddFloat(float){
	synthDelay.delayTime.value += float;
	delayValue.innerHTML = synthDelay.delayTime.value;
	console.log("ERA PARA IMRPIMIR PORRA!");

	console.log(synthDelay.delayTime.value);
}

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

function ligar(){
	console.log("ligar");
	let i;
	let nodoAnterior = nodos[0];
	for (i = 1; i < numeroNodos; i++) {
		if(vetorBooleano[i]){
			nodoAnterior.connect(nodos[i]);
			nodoAnterior = nodos[i];
		}
	}
	console.log("terminou ligar");
}

function addVibrar(bool){
	if(bool){
		delayButtonIncrease.classList.add('shake');
		delayButtonDecrease.classList.add('shake');
		compressorButton.classList.add('shake');
		reverbButton.classList.add('shake');
		delayButton.classList.add('shake');
		playButton.classList.add('shake');
		volumeControl.classList.add('shake');
		delayValue.classList.add('shake');
		distortionButton.classList.add('shake');
		selecionadoVibrar.classList.add('shake');
	}else{
		delayButtonIncrease.classList.remove('shake');
		delayButtonDecrease.classList.remove('shake');
		compressorButton.classList.remove('shake');
		reverbButton.classList.remove('shake');
		delayButton.classList.remove('shake');
		playButton.classList.remove('shake');
		volumeControl.classList.remove('shake');
		delayValue.classList.remove('shake');
		distortionButton.classList.remove('shake');
		selecionadoVibrar.classList.remove('shake');
	}
}

function addBarrelRoll(bool){
	if(bool){
		document.body.classList.add('rollar');
	}
	else{
		document.body.classList.remove('rollar');
	}
}

function addTelaPreta(bool){
	if(bool){
		tela.classList.add('telaPreta')
	}else{
		tela.classList.remove('telaPreta')
	}
}

function mudançaNodos(index){
	console.log("mudançaNodos");
	if(index !=0 && index != numeroNodos-1){
		let nodoAntes= nodos[anteriorNodoIndexTrue(index)];
		let nodoIndex= nodos[index];
		let nodoSucessor = nodos[proximoNodoIndexTrue(index)];
		if(vetorBooleano[index]){
			nodoAntes.disconnect(nodoSucessor);
			nodoAntes.connect(nodoIndex);
			nodoIndex.connect(nodoSucessor);
		}else{
			nodoAntes.disconnect(nodoIndex);
			nodoIndex.disconnect(nodoSucessor);
			nodoAntes.connect(nodoSucessor);
		}
	}
	console.log("fim mudançaNodos");
}

function proximoNodoIndexTrue(index){
	let i;
	for (i=index+1 ; i<numeroNodos ; i++){
		if(vetorBooleano[i]){
			return i;
		}
	}
}

function anteriorNodoIndexTrue(index){
	let i;
	for (i=index-1 ; i>0 ; i--){
		if(vetorBooleano[i]){
			return i;
		}
	}
}

function newBubble(){
	let x = 0 + Math.random() * document.documentElement.clientWidth;
	let y = document.documentElement.clientHeight + Math.random() * 10 ;
	let size = 0 + Math.random()*10;
	let speed = 0+ Math.random()*3;
	let color = '#'+(0x1000000+(99 +(Math.random()))*0xffffff).toString(16).substr(1,6);
	
	let bubble = document.createElement("div");
	bubble.setAttribute('class', 'bubble');
	bubble.style = "background-color : " + color + ";";
	bubble.bubbleSize = size;
	bubble.style.height = bubble.bubbleSize * 2 + "px";
	bubble.style.width = bubble.bubbleSize * 2 + "px";
	//bubble.time = d;
	bubble.speed = speed;
	bubble.position = [];
	bubble.position.x = x;
	bubble.position.y = y;
	bubble.style.left = bubble.position.x - bubble.bubbleSize + 'px';
	bubble.style.top = bubble.position.y - bubble.bubbleSize + 'px';
	document.body.insertAdjacentElement('beforeend',bubble);	
	return bubble;	
}

function createBubbles(){
	a = newBubble();
	bubbleArray.push(a);
}

function updateBubbles(){
	//console.log(bubbleArray);
	for (let bubble of bubbleArray){
		bubble.position.x += (-1+Math.random()*2);
		bubble.position.y -= bubble.speed;
		bubble.style.left = bubble.position.x - bubble.bubbleSize + 'px';
		bubble.style.top = bubble.position.y - bubble.bubbleSize + 'px';

	}

	bubbleArray = bubbleArray.filter(function(item){
		if (item.position.y + item.bubbleSize > 0 ){
			return true;
		}
		else{
			item.parentNode.removeChild(item);
			return false;
		}
	}) 
}

function drawOnScreen(){
	if(vetorBooleano[5] && Math.random() > 0.8){//mudar essa boleana para ser o vetorBooleano do elemento que vai fazer bolhas.

		createBubbles();
	}
	if( Array.isArray(bubbleArray) || bubbleArray.length){
		updateBubbles();
	}

	requestAnimationFrame(drawOnScreen);
}
