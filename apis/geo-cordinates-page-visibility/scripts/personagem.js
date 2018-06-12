document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {

	var keyCode = e.keyCode;
	if(keyCode==39) {
		document.getElementById('personagem').className = '';
		document.getElementById('personagem').className = 'andandoDireita';
		moverProLadoDireito();

	} 
	else if(keyCode == 37){
		document.getElementById('personagem').className = '';
		document.getElementById('personagem').className = 'andandoEsquerda';
		moverProLadoEsquerdo()

	}
	else if(keyCode == 38 || keyCode == 32){
		pular();

	}
	else if(keyCode == 40){
		document.getElementById('personagem').className = '';
		document.getElementById('personagem').className = 'parado';

	}

}



function moverProLadoDireito() {
	let personagem = document.getElementById("personagem");   
	let pos = personagem.getBoundingClientRect().left;
	pos=pos+50;
	 $("#personagem").animate({left: pos}, {duration: 300, complete:function(){
	 		document.getElementById('personagem').className = '';
	 		document.getElementById('personagem').className = 'parado';
	 		personagem.style.left = pos + 'px';
	 }});
	 
}
function moverProLadoEsquerdo() {
	let personagem = document.getElementById("personagem");
	let pos = personagem.getBoundingClientRect().left;
	pos = pos-100 >= 0 ? pos-100 : 0;
	if(pos>0){
		 $("#personagem").animate({left: pos}, {duration: 300, complete:function(){
		 	document.getElementById('personagem').className = '';
		 	document.getElementById('personagem').className = 'parado';
		 	personagem.style.left = pos + 'px'; 
		 }});	
	}   
	
}

function pular() {
	 $("#personagem").addClass('pulando');
	 setTimeout(function(){ $("#personagem").removeClass('pulando') }, 500);
	
}

function comerSanduiche(){

	$("#personagem").addClass('sanduiche');
	let fome = $("#barraFome").css("width");
	fome = fome.replace("%", "");
	let valorInteiro = parseInt(fome);
	valorInteiro -= 20;
	if(valorInteiro < 0 ) valorInteiro = 0;
	valorInteiro += "%";
	$("#barraFome").css({"width": valorInteiro});

	setTimeout(function(){ $("#personagem").removeClass('sanduiche') }, 1000);
}