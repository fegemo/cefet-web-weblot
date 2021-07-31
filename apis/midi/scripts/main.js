/**
 * add a element listener to one or more events
 * @param {Element} element is the DOM element where the listener will be added
 * @param {string} events is all the events separated by space ' '
 * @param {function} listener is the listener function to be triggered
 */
function addMultipleEventsListener(element, events, listener) {
    const eventList = events.split(' ');
    for (let event of eventList) {
        element.addEventListener(event, listener);
    }
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