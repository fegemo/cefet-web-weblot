import { Synthesizer, Utterance } from "./scripts/speech-synthesis.js";
import { Recognizer, Dictionary } from "./scripts/speech-recognition.js";

document.getElementById('intro-btn').addEventListener('click', () => {
    Recognizer.start();
    document.getElementById('intro').classList.add('disabled');
    document.getElementById('selection').classList.remove('disabled');
    document.getElementsByTagName('main')[0].classList.remove('disabled');
} , false);

document.getElementById('back-btn').addEventListener('click', () => {
    document.getElementById('selection').classList.remove('disabled');
    document.getElementById('app').classList.add('disabled');
} , false);

const scrollNames = {
    'pt-BR': 'Cura Menor',
    'pl-PL': 'Cura Maior',
    'ko-KR': 'Cura Suprema',
}

let rights = 0;
let lang = 'pt-BR';
let words = Dictionary[lang];
Recognizer.setLanguage(lang);
Synthesizer.setLanguage(lang);

Recognizer.onresult = (event) => {
    let success = checkBarbarian(event.results[event.resultIndex][0].transcript);
    console.log(event);
    testBarbarian(success);
}

Recognizer.onnomatch = (event) => {
    checkBarbarian('');
}

let currentWord = ''; 

// Static HTML components
const wordListElement = document.querySelector('p#words');
const resultSpanElement = document.querySelector('span#result');
const progressBarDivElement = document.querySelector('footer.progress-bar div');
const languageElement = document.querySelector('#selection');
document.getElementById('pronunciation-btn').addEventListener('click', () => {
    speakWord(currentWord)
}, false);

const onChoseLanguage = (key) => {
    document.getElementById('selection').classList.add('disabled');
    document.getElementById('app').classList.remove('disabled');
    restart(key);
}

Object.keys(scrollNames).forEach( (key) => {
    const optionElement = document.createElement('li');
    optionElement.classList.add('option');
    const textNode = document.createTextNode(scrollNames[key]);
    optionElement.appendChild(textNode);

    const flagElement = document.createElement('span');
    const country = ('' || key.split('-')[1]).toLocaleLowerCase();
    flagElement.classList.add('flag-icon', `flag-icon-${country}`);
    optionElement.addEventListener('click', () => {
        onChoseLanguage(key);
    });
    optionElement.appendChild(flagElement);
    languageElement.appendChild(optionElement);
});

const createWordElement = (word) => {
    const element = document.createElement('span');
    element.classList.add("word", "blurred");
    element.innerHTML = word;
    wordListElement.appendChild(element);
    return element;
}
let wordElements = words.map( createWordElement );

const speakWord = (word) => {
    Utterance.text = word;
    Synthesizer.speak(Utterance);
}

const testBarbarian = (success = false) => {
    currentWord = words[rights];
    wordElements[rights].classList.remove('blurred');
    if(success)
        speakWord(currentWord);
}

const checkBarbarian = (speechResult) => {
    const rightAnswer = (speechResult.trim().toLocaleLowerCase() === currentWord.toLocaleLowerCase());
    const resultText = rightAnswer ? (`"${speechResult}"? Right!`) : (`"${speechResult}"? Wrong!`);
    if(rightAnswer) {
        rights++;
    }
    resultSpanElement.innerHTML = resultText;
    return rightAnswer;
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
    currentWord = '';
    resultSpanElement.innerHTML = '';

    testBarbarian(true);
}
