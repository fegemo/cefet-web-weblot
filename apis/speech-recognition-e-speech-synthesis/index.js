import { Synthesizer, Utterance, Voices } from "./scripts/speech-synthesis.js";
import { Recognizer, GrammarLists, Dictionary } from "./scripts/speech-recognition.js";

let rights = 0;
let lang = 'pt-BR';
let words = Dictionary[lang];
Recognizer.setLanguage(lang);
Synthesizer.setLanguage(lang);

Synthesizer.customVoiceChanged = () => {    
    testBarbarian();
    Recognizer.start();
}

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
const languageElement = document.querySelector('aside#languages');

Object.keys(Dictionary).forEach( (key) => {
    const flagElement = document.createElement('span');
    const country = ('' || key.split('-')[1]).toLocaleLowerCase();
    flagElement.classList.add('flag-icon', `flag-icon-${country}`);
    flagElement.addEventListener('click', () => {
        restart(key);
    })
    languageElement.appendChild(flagElement);
});

const createWordElement = (word) => {
    const element = document.createElement('span');
    element.classList.add("word", "blurred");
    element.innerHTML = word;
    wordListElement.appendChild(element);
    return element;
}
let wordElements = words.map( createWordElement );

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

const restart = (new_lang) => {
    rights = 0;
    lang = new_lang;
    words = Dictionary[lang];
    Recognizer.setLanguage(lang);
    Recognizer.abort();
    Synthesizer.setLanguage(lang);
    
    wordListElement.innerHTML = '';
    wordElements = words.map( createWordElement );
    testBarbarian();
}