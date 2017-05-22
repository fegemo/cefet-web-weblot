function initMap(){

	let position = navigator.geolocation.getCurrentPosition(function (pos) {
		let latitude  = pos.coords.latitude; //obtem a latitude atual
		let longitude = pos.coords.longitude; //obtem a longitude atual
		exibeMapa(latitude, longitude);
	}, function(err){
		alert(err);
	});
}

function exibeMapa(latitude, longitude){

	let posicao = {
		lat: latitude, 
		lng: longitude
	};

	let map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: posicao
	});

	let marker = new google.maps.Marker({
		position: posicao,
		map: map,
		title: "Meu local"
	});
}









