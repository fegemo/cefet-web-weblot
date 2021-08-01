import { decrypt, encrypt, arrayBufferToBase64, base64ToArrayBuffer } from "./util-crypto.js"
export { activateFileHandling }

const fileEl = document.querySelector("#file");
const titleEl = document.querySelector("header");

const mode = "AES-GCM";
const length = 256;
const initializationVector = 12;

function activateFileHandling(hashedPassword){   
    const downloadFileEl = document.querySelector("#decrypto");

    fileEl.addEventListener("change", e => {
        cleanSubtitles();
        insertInfo();
        //storeFileTemporarily();
        storeFile(hashedPassword);        
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

async function storeFileTemporarily(){
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

async function storeFile(password){

    const fileReader = new FileReader();
    const selectedFile = fileEl.files[0];
    
    fileReader.readAsText(selectedFile);
    fileReader.onload = async function(evt){
        const fileText  =  evt.target.result;

        try{                  
            const encryptedObject = await encryptFile(fileText, password);
        
            console.log(encryptedObject);
                  
            sessionStorage.setItem("file", JSON.stringify(encryptedObject));
            changeButtonText();
        }
        catch(e){
            console.error("Error: ", e);
        }
    };
}

async function encryptFile(file, password){
    console.log("Texto puro codificado: ", file);    
            
    const encryptedText = await encrypt(file, password, mode, length, initializationVector);    
    console.log("Texto criptografado: ", encryptedText);

    const encryptedObject = {
        cipherText: arrayBufferToBase64(encryptedText.cipherText),
        iv: encryptedText.iv
    }

    console.log(encryptedObject);

    return encryptedObject;
}

async function decryptFile(password){
    const cryptedObject = JSON.parse(sessionStorage.getItem("file"));        
    console.log("Crypted:", cryptedObject);

    const cryptedText = {
        cipherText: base64ToArrayBuffer(cryptedObject.cipherText),
        iv: new Uint8Array(Object.values(cryptedObject.iv))
    }
    console.log(cryptedText);
      
    const file = await decrypt(cryptedText, password, mode, length);  
    console.log("File", file);  
    sessionStorage.setItem("file3", file);
}