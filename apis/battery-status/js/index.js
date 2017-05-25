//BATTERY STATUS

let bateria = document.getElementById('bateria');
let nivel = document.getElementById('nivel');
let status = document.getElementById('status');
let tempo = document.getElementById('tempo');
let imagem = document.getElementById('imagem');

let battery = navigator.getBattery();

updateBatteryStatus(battery);

function updateBatteryStatus(battery) {

	let nivelBateria = battery.level * 100;
    //let tempoBateriaCarregar = battery.chargingTime;
    //let tempoBateriaDescarregar = battery.dischargingTime;
	let textoBateria = "Nível de bateria do guerreiro:" + nivelBateria + "%";
    //let textoTempoCarregar = tempoBateriaCarregar + "segundos";
    //let textoTempoDescarregar = tempoBateriaDescarregar + "segundos";
    let textoStatusCarregando = "Carregando forças...";
    let textoStatusDescarregando = "Descarregando golpes...";

	nivel.textContent = textoBateria;
    //tempo.textContent = textoTempoCarregar;
    //tempo.textContent = textoTempoDescarregar;

    if (battery.charging){
        nivel.classList.remove('bateriaBaixa');
        nivel.classList.remove('descarregando');
        imagem.src = "imagens/bateriacarregada.png";
        status.textContent = textoStatusCarregando;
    } 
    else {
        status.textContent = textoStatusDescarregando;
        if (battery.level < 0.25){
            nivel.classList.remove('descarregando');
            nivel.classList.add('bateriaBaixa');
            imagem.src = "imagens/bateriaruim.png";
        } 
        if (battery.level > 0.25 && battery.level < 0.71) {
            nivel.classList.add('bateriaMedia');
            nivel.classList.add('descarregando');
            imagem.src = "imagens/bateriamedia.png";
        }  
        else {
            nivel.classList.add('descarregando');
            nivel.classList.add('bateriaAlta');
            imagem.src = "imagens/bateriaboa.png";
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