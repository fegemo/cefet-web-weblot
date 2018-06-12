let inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
let lastFile=[];
function handleFiles() {
	let fileList = this.files;
	console.log(fileList);
	var reader = new FileReader();
	for (var i = 0, numFiles = fileList.length; i < numFiles; i++) {
		var file = fileList[i];
		window.URL.revokeObjectURL(lastFile);
		lastFile=file;
		reader.onload = function () {
			var uploadedFile = reader.result;
			document.getElementById("description").innerHTML="<b> Nome: </b>"+file.name+
			"<br>"+"<b> Ultima modificação: </b>"+new Date(file.lastModified).toISOString()+
			"<br><b> Tamanho: </b>"+file.size+"b"+
			"<br><a href="+window.URL.createObjectURL(file)+">Abrir arquivo</a> (Sujeito a limitações do navegador)"+
			"<br><a href=\"javascript:showContent()\">Ver conteúdo do arquivo (como texto)</a>"+
			"<br><span id=\"filecontent\" class=\"invisible\"><b> Conteúdo:</b>"+atob(uploadedFile.split(',')[1])+"</span>";
		};
		reader.readAsDataURL(file);
	}
}
function showContent(){
	document.getElementById("filecontent").classList.toggle("invisible");
	console.log("wow");
}
