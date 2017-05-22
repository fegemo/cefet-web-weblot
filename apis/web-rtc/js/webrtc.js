

	var video = document.getElementById('video'),
		url = window.URL || 
					window.webkitURL;
	navigator.getMedia = navigator.getUserMedia || //Opera
						 navigator.webkitGetUserMedia || //Chrome
						 navigator.mozGetUserMedia || // Mozilla
						 navigator.msGetUserMedia; //EDGE
	navigator.getMedia({
		video: true,
		audio: true
	}, function(stream){
		video.src = url.createObjectURL(stream); //cria uma URL simples que pode ser usada para fazer referência a dados armazenados em um objeto 
		video.play();
		
	}, function(error){
		alert("deu ruim!");
	});
	
