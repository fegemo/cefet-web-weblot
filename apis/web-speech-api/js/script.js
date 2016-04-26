var recognizing = false;
var finalTranscript = '';

// Speech Recognition API
if (!('webkitSpeechRecognition' in window)) {
    // Checks browser support
    document.getElementById('sr-not-supported').classList.remove('hidden');
    
} else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Set en-US as default language
    
    recognition.onstart = function() {
        recognizing = true;
    };
    
    recognition.onerror = function() {
        console.log('An error occurred while recognizing your speech!');
    };
    
    recognition.onresult = function(event) {
        var interimTranscript = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }   
        }
        
        document.getElementById('final-span').innerHTML = finalTranscript;
        document.getElementById('interim-span').innerHTML = interimTranscript;
    };
}

function toggleRecognition(event) {
    // Toggle speech recognition by clicking on the mic button
    if (recognizing) {
        recognizing = false;
        recognition.stop();
        
        document.getElementById('start-speech').classList.remove('hidden');
        document.getElementById('stop-speech').classList.add('hidden');
        
        return;
        
    } else {
        finalTranscript = '';
        
        document.getElementById('start-speech').classList.add('hidden');
        document.getElementById('stop-speech').classList.remove('hidden');
        
        recognition.start();
        document.getElementById('final-span').innerHTML = '';
        document.getElementById('interim-span').innerHTML = '';
    }
}

// Speech Synthesis API
if (!('speechSynthesis' in window)) {
    // Checks browser support
    document.getElementById('ss-not-supported').classList.remove('hidden');
}

var synthesisButton = document.getElementById('toggle-synthesis');

synthesisButton.addEventListener('click', function(e) {
    if (finalTranscript.length > 0) {
        var spokenText = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        
        // Easter egg
        if (finalTranscript == "I like Lana Del Rey") {
            spokenText.text = "Me too, she's the best singer in the world!";
        } else if (finalTranscript == "tell me your secrets") {
            spokenText.text = "You know I can't really say that";
        } else {
            spokenText.text = finalTranscript;
        }
        
        spokenText.volume = 1;
        spokenText.rate = .8;
        spokenText.pitch = 0.9;
        //spokenText.voice = voices[34]; // Maged voice
        
        window.speechSynthesis.speak(spokenText);
    }
});