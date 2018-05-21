window.onload = () => {
  const synthesis = window.speechSynthesis;
  const voices = synthesis.getVoices();
  const voiceSelect = document.querySelector('#voice-select');
  const speakButton = document.querySelector('#speak-button');
  const speech = document.querySelector('#speech');
  
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.default) {
      option.textContent += ' (padrão)';
    }

    option.value = voice.name;
    voiceSelect.appendChild(option);
  });

  const defaultBrazilianVoice = voices.find(x => x.lang === 'pt-BR' && x.default);
  if (defaultBrazilianVoice) {
    voiceSelect.value = defaultBrazilianVoice.name;
  }

  $(voiceSelect).selectpicker({
    liveSearch: true,
  });

  speakButton.addEventListener('click', () => {
    const voice = new SpeechSynthesisUtterance(speech.value);
    voice.voice = voices.find(x => x.name === voiceSelect.value);
    synthesis.speak(voice);
  })
}
