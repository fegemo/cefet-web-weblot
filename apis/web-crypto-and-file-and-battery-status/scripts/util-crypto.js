export { hex, genEncryptionKey, encrypt, decrypt }

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
    
    return new TextDecoder().decode(decrypted);
}
