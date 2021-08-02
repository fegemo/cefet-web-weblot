export { handlePassword }

function handlePassword(){
    const passwordEl = document.querySelector("#password");

    const textEncoder = new TextEncoder();
    const encodedPassword = textEncoder.encode(passwordEl.value);

    return crypto.subtle.digest("SHA-256", encodedPassword); 
}
