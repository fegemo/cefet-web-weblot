var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const Dictionary = {
    'pl-PL': ["ja","Idę","ja","do zaprezentowania","jestem","O","bohater","tego","piosenka","oraz","Ten","Księżniczka","Idę","ratować","z","straszny","czarny charakter","nic","iść","ja","zatrzymać","nic","iść","ja","zapobiegać","bo","Daję","obcasy","w","pięć","metrów","oraz","nie","ja","zraniony","do","spaść","jestem","a","zły","Wojownik","ale","za","jeszcze","Co","ja","próbować","ja","zawsze","ja","zraniony","Kiedy","oparcie","w","jeden","wąż"],
    'pt-BR': ["Eu", "vou", "me", "apresentar", "sou", "o", "herói", "desta", "canção", "e", "a", "princesa", "vou", "resgatar", "do", "terrível", "vilão", "nada", "vai", "me", "parar", "nada", "vai", "me", "impedir", "pois", "dou", "saltos", "de", "5", "m", "e", "não", "me", "machuco", "ao", "cair", "sou", "um", "bravo", "guerreiro", "mas", "por", "mais", "que", "eu", "tente", "eu", "sempre", "me", "machuco", "quando", "encosto", "em", "uma", "serpente"],
    'ko-KR': [ "나", "내가 간다", "나", "제시", "오전", "영형", "영웅", "이의", "노래", "그리고", "더", "공주", "내가 간다", "구조하다", "의", "끔찍한", "악당", "아무것도 아님", "가다", "나", "그만하다.", "아무것도 아님", "가다", "나", "예방하다", "왜냐하면", "나는 주다", "뒷굽", "입력", "다섯", "미터", "그리고", "아니요", "나", "아프다", "로", "떨어지다", "오전", "에이", "화난", "전사", "하지만", "당", "더", "뭐라고 요", "나", "노력하다", "나", "항상", "나", "아프다", "언제", "등받이", "입력", "하나", "뱀" ]
};

const GrammarLists = {};

Object.keys(Dictionary).map( (key) => {
    const words = Dictionary[key];
    //shuffle(words);
    const grammar = '#JSGF V1.0; grammar words; public <word> = ' + words.join(' | ') + ' ;'
    const recognizerGrammar = new SpeechGrammarList();
    recognizerGrammar.addFromString(grammar, 1);
    GrammarLists[key] = recognizerGrammar;
} )

const Recognizer = new SpeechRecognition();

Recognizer.continuous = true;
Recognizer.interimResults = false;
Recognizer.maxAlternatives = 1;
Recognizer.onend = Recognizer.start;

Recognizer.onerror = (event) => {
    console.log('Error occurred in recognition: ' + event.error);
}

Recognizer.setLanguage = (lang) => {
    Recognizer.grammars = GrammarLists[lang];
    Recognizer.lang = lang;
}

export { Recognizer, GrammarLists, Dictionary };