let midi = null;
let output = null;

const loadingScreen = document.querySelector('#loading');
const pianoScreen = document.querySelector('#piano');

// First, let's validate if the browser has support to the API

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}
else {
    loadingScreen.innerHTML = 'Seu navegador não tem suporte ao Web MIDI API :(';
}

// If it has, let's try to sync the MIDI device

/**
 * Callback to be executed when MIDI Access is stablished
 * @param {Object} midiAccess is the Web MIDI API access list
 */
function onMIDISuccess(midiAccess) {
    console.log('MIDI Ready!');
    midi = midiAccess;
    output = midiAccess.outputs.values().next().value;
    if (output) {
        startLoggingMIDIInput(midiAccess);
        loadingScreen.classList.add('hidden');
        pianoScreen.classList.remove('hidden');
    }
    else {
        loadingScreen.innerHTML = 'Nenhum dispositivo MIDI foi detectado :(';
    }    
}

/**
 * Callback to be executed when MIDI Access cannot be stablished
 * @param {string} message is the error message
 */
function onMIDIFailure(message) {
    loadingScreen.innerHTML = `Erro ao conectar ao dispositivo MIDI: ${message}`;
}

/**
 * This function defines the event when a key is pressed on the piano
 * @param {Object} midiAccess is the Web MIDI API access list
 */
function startLoggingMIDIInput(midiAccess) {
    midiAccess.inputs.forEach( input => {
        input.onmidimessage = getPianoMIDIMessage;
    });
}

/**
 * Function to be executed in a Piano Key Press Event
 * @param {Object} message is the Web MIDI API Message Object
 */
 function getPianoMIDIMessage(message) {
    let command = message.data[0];
    let note = message.data[1];
    let velocity = message.data[2];
    let pianoNote = pianoNotes(note);
    const pianoNoteElement = document.querySelector(`#${pianoNote}`)
    switch (command) {
        case 144: // note on
            if (pianoNote) {
                if (velocity) {
                    pianoNoteElement.classList.add('active');
                } else {
                    // some keyboards also log velocity = 0 for note off
                    pianoNoteElement.classList.remove('active');
                }
            }
            break;
        case 128: // note off
            pianoNoteElement.classList.remove('active');
            break;
    }
}

// Let's also play some notes on the Piano when the user clicks on the interface!

const pianoKeys = document.querySelectorAll('#piano ul li');

for (let key of pianoKeys){
    const note = pianoValues(key.id);
    const velocity = 60;
    key.addEventListener('mouseover', (event) => {
        if (event.buttons === 1) {
            output.send([144, note, velocity]);
            key.classList.add('active');
        }
        else {
            output.send([128, note, velocity]);
            key.classList.remove('active');
        }
    });
    addMultipleEventsListener(key, 'mouseup mouseout', (event) => {
        output.send([128, note, velocity]);
        key.classList.remove("active");
    });
    key.addEventListener('mousedown', (event) => {
        output.send([144, note, velocity]);
        key.classList.add("active");
    });
    key.ondragstart = () => {
        return false;
    };
}