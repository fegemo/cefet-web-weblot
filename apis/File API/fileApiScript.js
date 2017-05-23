function pegaArquivo(files){
	var imgLocal = document.getElementById('imgLocal')
	var file = files[0];
	var img = document.createElement("img");
	img.file = file;

	imgLocal.appendChild(img)

	var reader = new FileReader();
	reader.onload = (function(aImg) {return function(e) {aImg.src = e.target.result;};})(img);
	reader.readAsDataURL(file);
}


function SelectAudio(files) {
	var file = files[0];
	if (file.type.match(/audio.*/)) {
		var reader = new FileReader();
		reader.onload = function(d) {
			var e = document.createElement("audio");
			e.src = d.target.result;
			e.setAttribute("type", file.type);
			e.setAttribute("controls", "controls");
			e.setAttribute("autoplay", "true");
			document.getElementById("container").appendChild(e);
		};
		reader.readAsDataURL(file);
	}
}