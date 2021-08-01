export { hex, genEncryptionKey, encrypt, decrypt, arrayBufferToBase64, base64ToArrayBuffer}

// Following code taken from the link below 
// https://webbjocke.com/javascript-web-encryption-and-hashing-with-the-crypto-api/
function hex (buff) {
    return [].map.call(new Uint8Array(buff), b => ('00' + b.toString(16)).slice(-2)).join('');
}

async function genEncryptionKey (password, mode, length) {
    const algo = {
        name: 'PBKDF2',
        hash: 'SHA-256',
        salt: new TextEncoder().encode('a-unique-salt'),
        iterations: 1000
    };
    const derived = { name: mode, length: length };
    const encoded = new TextEncoder().encode(password);
    const key = await crypto.subtle.importKey('raw', encoded, { name: 'PBKDF2' }, false, ['deriveKey']);
    
    return crypto.subtle.deriveKey(algo, key, derived, false, ['encrypt', 'decrypt']);
}

async function encrypt (text, password, mode, length, ivLength) {
    const algo = {
        name: mode,
        length: length,
        iv: crypto.getRandomValues(new Uint8Array(ivLength))
    };
    const key = await genEncryptionKey(password, mode, length);
    const encoded = new TextEncoder().encode(text);
    
    return {
        cipherText: await crypto.subtle.encrypt(algo, key, encoded),
        iv: algo.iv
    };
}

async function decrypt (encrypted, password, mode, length) {
    const  algo = {
        name: mode,
        length: length,
        iv: encrypted.iv
    };
    const key = await genEncryptionKey(password, mode, length);
    const decrypted = await crypto.subtle.decrypt(algo, key, encrypted.cipherText);
    
    console.log(decrypted);
    
    return new TextDecoder().decode(decrypted);
}

function arrayBufferToBase64( buffer ) {
	var binary = '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] );
	}
	return window.btoa( binary );
}

function base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
