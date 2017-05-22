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

	var marker1, marker2, marker3;

	marker1 = new google.maps.Marker({
		position: new google.maps.LatLng(-19.9379465, -44.0002333),
		title: "Unidade 1",
		map: map,
		icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
	});

	marker2 = new google.maps.Marker({
		position: new google.maps.LatLng(-19.940911, -44.0043728),
		title: "Unidade 2",
		map: map,
		icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
	});

	marker3 = new google.maps.Marker({
		position: new google.maps.LatLng(-19.942112, -43.998520),
		title: "Unidade 3",
		map: map,
		icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
	});

}











