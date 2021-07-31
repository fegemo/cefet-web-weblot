import { batteryInfo } from "./battery-status.js"
import { activateFileHandling } from "./file-upload.js"
import { hex } from "./util-crypto.js"
import { handlePassword } from "./input-password.js"

// battery 
let batteryH1El = document.querySelector("#battery");
let bodyEl = document.querySelector("body");
let imgEnergyEl = document.querySelector(".energy>img");
let containerEl = document.querySelector(".energy");
let chargingStatus;

let batteryListValues = [];
let batteryHeaderValues = ["Carregando", "Tempo para descarregar", "Nível"];


function showBattery() {
    let battery = batteryInfo();

    batteryListValues[0] = battery.chargingStatus;
    batteryListValues[1] = battery.dischargingTime;
    batteryListValues[2] = battery.level;
    chargingStatus = battery.chargingStatus;

    for (let i = 1; i < 4; i++) {

        let pEl = containerEl.querySelector(`p:nth-child(${i})`);
        pEl.innerHTML = "";
        pEl.innerHTML = `${batteryHeaderValues[i - 1]}: ${batteryListValues[i - 1]}`
    }

    if (chargingStatus === "Não") {
        batteryH1El.classList.remove("battery-charging");
        batteryH1El.classList.add("battery-discharging");
        bodyEl.classList.add("set-alert-color");
        imgEnergyEl.src = "images/energy-off.jpg"
    }
    else {
        batteryH1El.classList.remove("battery-discharging");
        batteryH1El.classList.add("battery-charging");
        bodyEl.classList.remove("set-alert-color");
        imgEnergyEl.src = "images/energy-on.jpg"
    }

}
window.setInterval(showBattery, 1000);


// file upload
activateFileHandling();


// password insertion
const submitEl = document.querySelector("#submit");
const sections = document.querySelectorAll("section");
submitEl.addEventListener("click", e => {
    handlePassword().then(hashedPassword => {
        try{
            sessionStorage.setItem("password", hex(hashedPassword));
        }
        catch(e){
            console.error("Error: ", e);
        }

        sections.forEach(element => element.classList.toggle("password-input"));
    });
});