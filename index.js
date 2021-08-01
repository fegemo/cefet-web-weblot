import { Synthesizer, Utterance, Voices } from "./scripts/speech-synthesis.js";
import { Recognizer, GrammarLists, Dictionary } from "./scripts/speech-recognition.js";

let rights = 0;
const lang = 'pt-BR';
const words = Dictionary[lang];

Synthesizer.customVoiceChanged = () => {    
    testBarbarian();
    Recognizer.start();
}

Recognizer.setLanguage(lang);
Synthesizer.setLanguage(lang);

Recognizer.onresult = (event) => {
    checkBarbarian(event.results[event.resultIndex][0].transcript);
    console.log(event);
    testBarbarian();
}

Recognizer.onnomatch = (event) => {
    checkBarbarian('');
}

let currentWord = ''; 

// Static HTML components
const wordListElement = document.querySelector('p#words');
const resultSpanElement = document.querySelector('span#result');
const progressBarDivElement = document.querySelector('footer.progress-bar div');
const speakIndicatorElement = document.querySelector('aside#speak-indicator');

const createWordElement = (word) => {
    const element = document.createElement('span');
    element.classList.add("word", "blurred");
    element.innerHTML = word;
    wordListElement.appendChild(element);
    return element;
}
const wordElements = words.map( createWordElement );

const testBarbarian = () => {
    currentWord = words[rights];
    wordElements[rights].classList.remove('blurred');
    Utterance.text = currentWord;
    Synthesizer.speak(Utterance);
}

const checkBarbarian = (speechResult) => {
    const rightAnswer = (speechResult.trim().toLocaleLowerCase() === currentWord.toLocaleLowerCase());
    const resultText = rightAnswer ? (`"${speechResult}"? Right!`) : (`"${speechResult}"? Wrong!`);
    if(rightAnswer) {        
        rights++;
    }
    resultSpanElement.innerHTML = resultText;
}