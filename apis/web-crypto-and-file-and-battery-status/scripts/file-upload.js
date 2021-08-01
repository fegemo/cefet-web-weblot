import { decrypt, encrypt, arrayBufferToBase64, base64ToArrayBuffer } from "./util-crypto.js"
export { activateFileHandling }

const fileEl = document.querySelector("#file");
const titleEl = document.querySelector("header");
const downloadFileEl = document.querySelector("#decrypto");

const mode = "AES-GCM";
const length = 256;
const initializationVector = 12;

function activateFileHandling(hashedPassword){   

    fileEl.addEventListener("change", e => {
        cleanSubtitles();
        insertInfo();
        storeFileTemporarily();
        encryptFile(hashedPassword);
    });

    downloadFileEl.addEventListener("click", e => {
        decryptFile(hashedPassword);
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
            sessionStorage.setItem("file", fileText);
            sessionStorage.setItem("file2", fileText);
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
    console.log(fileText);    
    
    const encryptedText = await encrypt(fileText, password, mode, length, initializationVector);    
    console.log(encryptedText);

    const encryptedObject = {
        cipherText: arrayBufferToBase64(encryptedText.cipherText),
        iv: encryptedText.iv
    }

    console.log(encryptedObject);
          
    sessionStorage.setItem("file", JSON.stringify(encryptedObject));
}

async function decryptFile(password){
    const cryptedObject = JSON.parse(sessionStorage.getItem("file"));        
    console.log(cryptedObject);

    const cryptedText = {
        cipherText: base64ToArrayBuffer(cryptedObject.cipherText),
        iv: new Uint8Array(Object.values(cryptedObject.iv))
    }
    console.log(cryptedText);
      
    const file = await decrypt(cryptedText, password, mode, length);  
    console.log(file);  
    sessionStorage.setItem("file3", file);
}