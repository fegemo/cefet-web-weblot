const piano_keys = document.querySelectorAll("#piano li");
let midi = null;
let output = null;

function onMIDISuccess(midiAccess) {
    console.log('MIDI Ready!');
    startLoggingMIDIInput(midiAccess);
    midi = midiAccess;
    output = midiAccess.outputs.values().next().value;
}

function onMIDIFailure(message) {
    console.log(`Failed to get MIDI access: ${message}`);
}

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}
else {
    console.log('Your browser don\'t have MIDI support');
}

function startLoggingMIDIInput(midiAccess) {
    midiAccess.inputs.forEach( input => {
        input.onmidimessage = getPianoMIDIMessage;
    });
}

for (let key of piano_keys){
    const note = pianoValues(key.id);
    const velocity = 60;
    key.addEventListener('mouseover', (event) => {
        if (event.buttons === 1) {
            output.send([144, note, velocity]);
            key.classList.add("active");
        }
        else {
            output.send([128, note, velocity]);
            key.classList.remove("active");
        }
    });
    key.addEventListener('mousedown', (event) => {
        output.send([144, note, velocity]);
        key.classList.add("active");
    });
    key.addEventListener('mouseup', (event) => {
        output.send([128, note, velocity]);
        key.classList.remove("active");
    });
    key.addEventListener('mouseout', (event) => {
        output.send([128, note, velocity]);
        key.classList.remove("active");
    });
    key.ondragstart = () => {
        return false;
    };
}


function pianoNotes(value) {
    const pianoNotesDict = {
        48: 'low_c',
        49: 'low_cs',
        50: 'low_d',
        51: 'low_ds',
        52: 'low_e',
        53: 'low_f',
        54: 'low_fs',
        55: 'low_g',
        56: 'low_gs',
        57: 'low_a',
        58: 'low_as',
        59: 'low_b',
        60: 'middle_c',
        61: 'cs',
        62: 'd',
        63: 'ds',
        64: 'e',
        65: 'f',
        66: 'fs',
        67: 'g',
        68: 'gs',
        69: 'a',
        70: 'as',
        71: 'b',
        72: 'high_c'
    };
    return pianoNotesDict[value];
}

function pianoValues(note) {
    const pianoValuesDict = {
        'low_c': 48,
        'low_cs': 49,
        'low_d': 50,
        'low_ds': 51,
        'low_e': 52,
        'low_f': 53,
        'low_fs': 54,
        'low_g': 55,
        'low_gs': 56,
        'low_a': 57,
        'low_as': 58,
        'low_b': 59,
        'middle_c': 60,
        'cs': 61,
        'd': 62,
        'ds': 63,
        'e': 64,
        'f': 65,
        'fs': 66,
        'g': 67,
        'gs': 68,
        'a': 69,
        'as': 70,
        'b': 71,
        'high_c': 72
    };

    return pianoValuesDict[note];
}

function getPianoMIDIMessage(message) {
    let command = message.data[0];
    let note = message.data[1];
    let velocity = message.data[2];
    let piano_note = pianoNotes(note);
    const piano_note_element = document.querySelector(`#${piano_note}`)
    switch (command) {
        case 144:
            if (piano_note && velocity) {
                piano_note_element.classList.add('active');
            }
            break;
        case 128:
            piano_note_element.classList.remove('active');
            break;
    }
}