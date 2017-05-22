//BATTERY STATUS

let bateria = document.getElementById('bateria');
let nivel = document.getElementById('nivel');
let status = document.getElementById('status');

let battery = navigator.getBattery();

updateBatteryStatus(battery);

function updateBatteryStatus(battery) {

	let nivelBateria = battery.level * 100;

	let textoBateria = nivelBateria + "%";

	nivel.textContent = textoBateria;

    if (battery.charging){
        nivel.classList.remove('bateriaBaixa');
        nivel.classList.remove('descarregando');
    } else {
        if (battery.level < 0.50){
            nivel.classList.remove('descarregando');
            nivel.classList.add('bateriaBaixa');
        } else {
            nivel.classList.add('descarregando');
        }
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