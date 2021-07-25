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

