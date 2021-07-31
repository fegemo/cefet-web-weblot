let midi = null;

function onMIDISuccess(midiAccess) {
    console.log('MIDI Ready!');
    startLoggingMIDIInput(midiAccess);
    midi = midiAccess;
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
        input.onmidimessage = onAlesisNitroMeshMessage;
    });
}

function onAlesisNitroMeshMessage(event) {
    let type = event.data[0];
    let note = AlesisNitroMeshNotes(event.data[1]);
    let velocity = event.data[2];
    if (type != 248 && note && velocity != 0) {
        console.log(note);
    }
}

function pianoNotes(note) {
    const pianoNotesDict = {
        // 48 até 72
        48: 'low_c',
        49: 'low_c#',
        50: 'low_d',
        51: 'low_d#',
        52: 'low_e',
        53: 'low_f',
        54: 'low_f#',
        55: 'low_g',
        56: 'low_g#',
        57: 'low_a',
        58: 'low_a#',
        59: 'low_b',
        60: 'middle_c',
        61: 'c#',
        62: 'd',
        63: 'd#',
        64: 'e',
        65: 'f',
        66: 'f#',
        67: 'g',
        68: 'g#',
        69: 'a',
        70: 'a#',
        71: 'b',
        72: 'high_c'
    };

    return pianoNotesDict[note];
}

function AlesisNitroMeshNotes(note) {
    const AlesisNitroMeshNotesDict = {
        36: 'Bass Drum',
        38: 'Snare',
        40: 'Snare Rim Shot',
        42: 'Hi-Hat Closed',
        43: 'Floor Tom',
        45: 'Tom 2',
        46: 'Hi-Hat Open',
        48: 'Tom 1',
        49: 'Crash Cymbal',
        51: 'Ride Cymbal'
    }

    return AlesisNitroMeshNotesDict[note];
}
