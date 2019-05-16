var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

const actions = ['ATAQUE','ESQUERDA','DIREITA','MORTE'];
var grammar = '#JSGF V1.0; grammar actions; public <action> = ' + actions.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'pt-BR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.addEventListener("DOMContentLoaded", function(event) {
  recognition.start();
});

recognition.addEventListener("result", function(event) {
  var last = event.results.length - 1;
  var action = event.results[last][0].transcript;
  var input = action.toUpperCase().replace(/\s/g, '');

  if(actions.includes(input)){
  	shinigami.estado = input;
  	mudaSprite();
  }
});
