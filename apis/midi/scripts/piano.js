const piano = document.querySelector('#piano');

function pianoNotes(note) {
    const pianoNotesDict = {
        // 48 até 72
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

    return pianoNotesDict[note];
}

function getPianoMIDIMessage(message) {
    var command = message.data[0];
    var note = message.data[1];
    var velocity = message.data[2];

    switch (command) {
        case 153: // noteOn (should be 144 on pianos)
            let piano_note = pianoNotes(note);
            if (piano_note && velocity) {
                // crocodilisse
                const piano_note_element = document.querySelector(`#${piano_note}`);
                piano_note_element.classList.add('active');
                setTimeout(() => {
                    piano_note_element.classList.remove('active');
                }, 1000);
                // note.play(piano_note, velocity);
            }
            break;
    }
}