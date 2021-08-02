const botao = document.querySelector("#botao-encontrar");
const map = document.querySelector("#map");

const criarMapa = (latitude, logitude) => {
  
  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([logitude, latitude]),
      zoom: 16
    })
  });

  const layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([logitude, latitude]))
            })
        ]
    })});
    
  map.addLayer(layer);
}

const localizador = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      botao.style.display = 'none';
      map.style.display = 'inline-block';
      console.log(position);

      criarMapa(position.coords.latitude, position.coords.longitude);
    })
  } else {
    alert("Não foi possível obter sua localização.");
  }
}

botao.addEventListener('click', localizador);
