let midi = null;
let output = null;

const piano = Synth.createInstrument(`piano`);
const loadingScreen = document.querySelector('#loading');
const pianoScreen = document.querySelector('#piano');
const histogramScreen = document.querySelector('#histogram');

let notesPressTimestamp = {};

function getDefaultNotesHistogram() {
    return Object.keys(PIANO_VALUES_DICT).reduce((acc, note) => ({ ...acc, [note]: 0}), {});
}

let notesHistogram = getDefaultNotesHistogram();

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
        histogramScreen.classList.remove('hidden');
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

function synthInput(pianoNote){
    let note, octave;
    if (pianoNote.startsWith('low')) {
        octave = 3;
    } else if (pianoNote.startsWith('high')) {
        octave = 5;
    }
    else {
        octave = 4;
    }
    note = pianoNote.replace('low_', '').replace('high_', '').replace('middle_', '').replace('s', '#').toUpperCase()
    return {'note': note, 'octave': octave};
}

function handlePianoKeyDown(pianoNote) {
    const pianoNoteElement = document.querySelector(`#${pianoNote}`)
    pianoNoteElement.classList.add('active');
    notesPressTimestamp[pianoNote] = Date.now();
    const input = synthInput(pianoNote);
    piano.play(input.note, input.octave, 1);
}

function handlePianoKeyUp(pianoNote) {
    const pianoNoteElement = document.querySelector(`#${pianoNote}`)
    const currentTimestamp = Date.now();
    const keyTimePressed = currentTimestamp - (notesPressTimestamp[pianoNote] ?? currentTimestamp);
    notesHistogram[pianoNote] = notesHistogram[pianoNote] + keyTimePressed;
    pianoNoteElement.classList.remove('active');
    renderNotesHistogramChart();
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
    switch (command) {
        case 144: // note on
            if (pianoNote) {
                if (velocity) {
                    handlePianoKeyDown(pianoNote);
                } else {
                    // some keyboards also log velocity = 0 for note off
                    handlePianoKeyUp(pianoNote);
                }
            }
            break;
        case 128: // note off
            handlePianoKeyUp(pianoNote);
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
            handlePianoKeyDown(key.id);
        }
        else {
            output.send([128, note, velocity]);
            handlePianoKeyUp(key.id);
        }
    });
    addMultipleEventsListener(key, 'mouseup mouseout', (event) => {
        output.send([128, note, velocity]);
        handlePianoKeyUp(key.id);
    });
    key.addEventListener('mousedown', (event) => {
        output.send([144, note, velocity]);
        handlePianoKeyDown(key.id);
    });
    key.ondragstart = () => {
        return false;
    };
}