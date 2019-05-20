let latitude;
let longitude;

var geoGerCoords = document.getElementById('geo-get-coords')
geoGerCoords.addEventListener('click', function(e) {
    var startPos;
    var geoSuccess = function(position) {
        startPos = position;
        latitude = startPos.coords.latitude;
        longitude = startPos.coords.longitude
        document.getElementById('startLat').innerHTML = "LATITUDE: " + latitude;
        document.getElementById('startLon').innerHTML = " LONGITUDE: " + longitude;
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
});

var geoGetMap = document.getElementById('geo-get-map')

geoGetMap.addEventListener('click', function(e) {
    var map = L.map('location-map').setView([latitude, longitude], 17);
    mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; ' + mapLink,
            maxZoom: 20,
    }).addTo(map);
    var marker = L.marker([latitude, longitude]).addTo(map);
})
