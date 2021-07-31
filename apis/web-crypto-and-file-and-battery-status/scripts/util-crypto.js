export { hex }

// Following code taken from the below link to use in conversions
// https://webbjocke.com/javascript-web-encryption-and-hashing-with-the-crypto-api/
function hex (buff) {
    return [].map.call(new Uint8Array(buff), b => ('00' + b.toString(16)).slice(-2)).join('');
}
