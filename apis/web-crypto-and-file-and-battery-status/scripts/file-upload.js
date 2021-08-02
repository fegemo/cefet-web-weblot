import { decrypt, encrypt, arrayBufferToBase64, base64ToArrayBuffer } from "./util-crypto.js"
export { activateFileHandling }

const fileEl = document.querySelector("#file");
const titleEl = document.querySelector("header");
const downloadFileEl = document.querySelector("#decrypto");

const mode = "AES-GCM";
const length = 256;
const initializationVector = 12;
let fileName;

function activateFileHandling(hashedPassword){       

    fileEl.addEventListener("change", e => {
        cleanSubtitles();
        insertInfo();
        storeFile(hashedPassword);        
    });

    downloadFileEl.addEventListener("click", async function(e){
        const data = await decryptFile(hashedPassword);
        downloadFile(data);
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

    fileName = selectedFile.name.split(".")[0];
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
                  
            sessionStorage.setItem("file", JSON.stringify(encryptedObject));
            changeButtonText();
        }
        catch(e){
            console.error("Error: ", e);
        }
    };
}

async function encryptFile(file, password){    
            
    const encryptedText = await encrypt(file, password, mode, length, initializationVector);    

    const encryptedObject = {
        cipherText: arrayBufferToBase64(encryptedText.cipherText),
        iv: encryptedText.iv
    }

    return encryptedObject;
}

async function decryptFile(password){
    const cryptedObject = JSON.parse(sessionStorage.getItem("file"));    

    const cryptedText = {
        cipherText: base64ToArrayBuffer(cryptedObject.cipherText),
        iv: new Uint8Array(Object.values(cryptedObject.iv))
    }
      
    const file = await decrypt(cryptedText, password, mode, length);  
    
    return file;
}

function downloadFile(data){
    let myFile = new File([data], `${fileName}.txt`, {
        type:"text/plain"
    });
    let url = URL.createObjectURL(myFile);
    let a = document.createElement("a");
    a.href = url;
    a.setAttribute("download",`${fileName}.txt`);
    a.click();
}