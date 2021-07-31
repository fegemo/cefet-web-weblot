import { encrypt, hex } from "./util-crypto.js"
export { activateFileHandling }

const fileEl = document.querySelector("#file");
const titleEl = document.querySelector("header");

function activateFileHandling(hashedPassword){   

    fileEl.addEventListener("change", e => {
        cleanSubtitles();
        insertInfo();
        storeFileTemporarily();
        encryptFile(hashedPassword);
    });
}


function cleanSubtitles(){
    const subtitles = document.querySelectorAll("h2");
    subtitles.forEach(subtitleEl => {
        subtitleEl.remove();
    });
}

function insertInfo(){
    const selectedFile = fileEl.files[0];

    const nameEl = document.createElement("h2");
    const mimeEl = document.createElement("h2");
    const sizeEl = document.createElement("h2");

    nameEl.innerHTML = `Nome: ${selectedFile.name}`;
    mimeEl.innerHTML = `Tipo MIME: ${selectedFile.type}`;
    sizeEl.innerHTML = `Tamanho: ${selectedFile.size} bytes`;

    titleEl.appendChild(nameEl);
    titleEl.appendChild(mimeEl);
    titleEl.appendChild(sizeEl);
}

function storeFileTemporarily(){
    const fileReader = new FileReader();
    const selectedFile = fileEl.files[0];
    
    fileReader.readAsText(selectedFile);
    fileReader.onload = evt => {
        const fileText  =  evt.target.result;

        try{
            window.sessionStorage.setItem("file", fileText);
            changeButtonText();
        }
        catch(e){
            console.error("Error: ", e);
        }
    };
}

function changeButtonText(){
    const labelEl = document.querySelector("label");
    labelEl.innerHTML = "Arquivo salvo!";    
}

async function encryptFile(password){
    const fileText = sessionStorage.getItem("file");
    const mode = "AES-GCM";
    const length = 256;
    const initializationVector = 12;
    
    const encryptedText = await encrypt(fileText, password, mode, length, initializationVector);
    encryptedText.cipherText = hex(encryptedText.cipherText);
    console.log(encryptedText.cipherText)
    sessionStorage.setItem("file", JSON.stringify(encryptedText));
}