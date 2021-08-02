let chargingStatus;
let dischargingTime;
let level;

function batteryInfo() {

    let battery = {
        chargingStatus: chargingStatus,
        dischargingTime: dischargingTime,
        level: level
    }

    return battery;
}

navigator.getBattery().then(function (battery) {
    function updateAllBatteryInfo() {
        updateChargeInfo();
        updateLevelInfo();
        updateDischargingInfo();
    }
    updateAllBatteryInfo();

    battery.addEventListener("chargingchange", function () {
        updateChargeInfo();
    });
    function updateChargeInfo() {
        chargingStatus = battery.charging ? "Sim" : "Não";
    }

    battery.addEventListener("levelchange", function () {
        updateLevelInfo();
    });
    function updateLevelInfo() {
        level = battery.level * 100 + "%";
    }

    battery.addEventListener("dischargingtimechange", function () {
        updateDischargingInfo();
    });
    function updateDischargingInfo() {
        let hours = Math.trunc(battery.dischargingTime / 3600);
        let minutes = Math.trunc(((battery.dischargingTime / 3600) - hours) * 60);
        let seconds = Math.trunc(((((battery.dischargingTime / 3600) - hours) * 60) - minutes) * 60);
        dischargingTime = "Não é possível estimar.";

        if (battery.dischargingTime !== Infinity) {
            dischargingTime = `${hours}h${minutes}min${seconds}s`;
        }
    }

});

export { batteryInfo }
