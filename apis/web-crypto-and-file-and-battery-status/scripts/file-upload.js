export { activateFileHandling }

const fileEl = document.querySelector("#file");
const titleEl = document.querySelector("header");

function activateFileHandling(){   

    fileEl.addEventListener("change", e => {
        cleanSubtitles();
        insertInfo();
        storeFile();
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

function storeFile(){
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