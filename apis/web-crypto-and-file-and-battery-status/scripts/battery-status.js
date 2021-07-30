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

    battery.addEventListener('chargingchange', function () {
        updateChargeInfo();
    });
    function updateChargeInfo() {
        chargingStatus = battery.charging ? "Sim" : "Não";
    }

    battery.addEventListener('levelchange', function () {
        updateLevelInfo();
    });
    function updateLevelInfo() {
        level = battery.level * 100 + "%";
        console.log("Battery level: "
            + battery.level * 100 + "%");
    }

    battery.addEventListener('dischargingtimechange', function () {
        updateDischargingInfo();
    });
    function updateDischargingInfo() {
        dischargingTime = battery.dischargingTime + " seconds";
        console.log("Battery discharging time: "
            + battery.dischargingTime + " segundos");
    }

});

export { batteryInfo }
