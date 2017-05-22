function initMap(){

	var position = navigator.geolocation.getCurrentPosition(function (pos) {
		var latitude  = pos.coords.latitude; //obtem a latitude atual
		var longitude = pos.coords.longitude; //obtem a longitude atual
		exibeMapa(latitude, longitude);
	}, function(err){
		alert(err);
	});
}


function exibeMapa(latitude, longitude){

	var posicao = {
		lat: latitude, 
		lng: longitude
	};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: posicao
	});

	var marker = new google.maps.Marker({
		position: posicao,
		map: map,
		title: "Meu local"
	});

}






