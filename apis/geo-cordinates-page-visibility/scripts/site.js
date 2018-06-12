

function mudarCorDeFundo(valorCorDeFundo) {
	var valor = valorCorDeFundo;
	if(valor==1){
		$("body").css("background-color","orange")
		$("body").css("color","black")
	}else if(valor==2){
		$("body").css("background-color","DarkRed")
		$("body").css("color","white")
	}else{
		$("body").css("background-color","LightGoldenRodYellow")
		$("body").css("color","black")
	}
	
}

function mudarChao() {

	let elemento = $("#chao");


	if (elemento.hasClass('chao1')) {
	    elemento.removeClass('chao1').addClass('chao2');
	} else if (elemento.hasClass('chao2')) {
	    elemento.removeClass('chao2').addClass('chao3');
	} else if (elemento.hasClass('chao3')) {
	    elemento.removeClass('chao3').addClass('chao1');
	}
	
}

function adicionarTexto(){
	$(".site").css('display','block');
	$("#personagem-chao").css("display","none");
	$("#conteudo").css("display","none");
	$("#mudar-textos").css('display','block');

}

function mostrarImagens(){

	$(".site").css('display','none');
	$("#galeria").css('display','block');

}

function irParaHome(){
	$(".site").css('display','block');
	$("#conteudo").css("display","block");
	$("#mudar-textos").css('display','none');
	$("#personagem-chao").css("display","block");
}
function salvarTextos(){
	let titulo = $("#titulo-site").val();
	let texto = $("#texto-site").val();
	$(".site").css('display','block');
	$('#titulo').html(titulo);
	$('#texto').html(texto);
	$("#conteudo").css("display","block");
	$("#mudar-textos").css('display','none');
	$("#personagem-chao").css("display","block");
}

$("#btn-status").popover({
    html: true, 
    placement: "bottom",
    container: 'body',
	content: function() {
          return $('#conteudo-popover').html();
        }
});

$("#btn-acoes").popover({
    html: true, 
    placement: "bottom",
    container: 'body',
	content: function() {
          return $('#menu-acoes').html();
        }
});


function getWeather(lati, long, callback) {
   var url = 'https://api.openweathermap.org/data/2.5/weather?APPID=3ee0b96227cd0dc3f39812ffa4f8dc6d';
   
   $.ajax({
     dataType: "jsonp",
     url: url,
     jsonCallback: 'jsonp',
     data: { lat: lati, lon: long },
     cache: false,
     success: function (data) {
         callback(data);
     }
   });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pesquisarTempoLocal);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function pesquisarTempoLocal(position){
	getWeather(position.coords.latitude, position.coords.longitude, function(data) {
		let cityname = data.name;
		let iconcode = data.weather[0].icon;
		let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
		$('#tempoImagem').attr('src', iconurl);
		$('#cidade').html(cityname);
	});
}

function onStartAplication(){
	getLocation();
}

function handleVisibilityChange() {
	let audio = document.getElementById("musica");
	if (document.hidden) {
		audio.pause();
	} else  {
		audio.play();
	}
  }
  
document.addEventListener("visibilitychange", handleVisibilityChange, false);


$(document).ready(
	 onStartAplication()

);