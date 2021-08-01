const PIANO_VALUES_DICT = {
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

const PIANO_NOTES_DICT = Object.keys(PIANO_VALUES_DICT).reduce((acc, note) => {
    const value = PIANO_VALUES_DICT[note];
    return { ...acc, [value]: note};
}, {});

function pianoNotes(value) {
    return PIANO_NOTES_DICT[value];
}

function pianoValues(note) {
    return PIANO_VALUES_DICT[note];
}


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