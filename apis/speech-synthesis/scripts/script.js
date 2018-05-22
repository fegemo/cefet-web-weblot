const initSelect = () => {
  const synthesis = window.speechSynthesis;
  const voices = synthesis.getVoices();
  const voiceSelect = document.querySelector('#voice-select');

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.default) {
      option.textContent += ' (padrão)';
    }

    option.value = voice.name;
    voiceSelect.appendChild(option);
  });

  $(voiceSelect).selectpicker({
    liveSearch: true,
  });

  $(voiceSelect).selectpicker('refresh');

  const defaultBrazilianVoice = voices.find(x => x.lang === 'pt-BR' && x.default);
  if (defaultBrazilianVoice) {
    voiceSelect.value = defaultBrazilianVoice.name;
  }
};

window.onload = () => {
  const synthesis = window.speechSynthesis;
  const voices = synthesis.getVoices();
  const voiceSelect = document.querySelector('#voice-select');
  const speakButton = document.querySelector('#speak-button');
  const speech = document.querySelector('#speech');

  const speakButtonListener = () => {
    const voice = new SpeechSynthesisUtterance(speech.value);
    voice.voice = voices.find(x => x.name === voiceSelect.value);
    synthesis.speak(voice);
  };

  initSelect();
  speakButton.addEventListener('click', speakButtonListener);
};
