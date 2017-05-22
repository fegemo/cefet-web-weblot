//BATTERY STATUS

var bateria = document.getElementById('bateria');
var nivel = document.getElementById('nivel');
var status = document.getElementById('status');

var battery = navigator.getBattery();

updateBatteryStatus(battery);

function updateBatteryStatus(battery) {

	var nivelBateria = battery.level * 100;

	var textoBateria = nivelBateria + "%";

	nivel.textContent = textoBateria;

    if (battery.charging){
        nivel.classList.remove('descarregando');
    } else {
        nivel.classList.add('descarregando');
    }
}

battery.then(function(battery) {

    updateBatteryStatus(battery);

    //evento disparado quando o carregamento é alterado 
    //(se é conectado à tomada ou se é desconectado)
    battery.onchargingchange = function () {
        updateBatteryStatus(battery);
    };

    //evento disparado quando o nível de bateria é alterado
    battery.onlevelchange = function () {
    	updateBatteryStatus(battery);
    };

});