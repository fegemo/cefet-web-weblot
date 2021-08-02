const Synthesizer = speechSynthesis;
const Utterance = new SpeechSynthesisUtterance();
const Voices = {};
Synthesizer.lang = 'pt-BR';

Synthesizer.customVoiceChanged = () => {}

Synthesizer.onvoiceschanged = () => {
    Synthesizer.getVoices().forEach( (voice) => {
        Voices[voice.lang] = voice;
    })
    if(Voices[Synthesizer.lang]) Utterance.voice = Voices[Synthesizer.lang];
    Synthesizer.customVoiceChanged();
}

Synthesizer.setLanguage = (lang) => {
    Synthesizer.lang = lang;
    if(Voices[Synthesizer.lang]) Utterance.voice = Voices[Synthesizer.lang];
}

export { Synthesizer, Utterance, Voices };