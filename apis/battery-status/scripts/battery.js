let batteryEl = document.querySelector('#battery');

let state = 'walk';

function updateBatteryStatus(battery) {
    let chargingEl = document.querySelector('#charging');

    batteryEl.style.width = battery.level * 72 + "px";

    if (battery.level < 0.3) {
        batteryEl.style.backgroundImage = 'linear-gradient(to bottom, rgba(248,80,50,1) 0%, rgba(241,111,92,1) 50%, rgba(246,41,12,1) 51%, rgba(231,56,39,1) 100%)';
        if (battery.level > 0.1) {
            state = 'hurt';
        }
    } else {
        batteryEl.style.backgroundImage = 'linear-gradient(to bottom, rgba(157,213,58,1) 0%, rgba(161,213,79,1) 50%, rgba(128,194,23,1) 51%, rgba(124,188,10,1) 100%)';
        state = 'walk';
    }

    if (battery.level <= 0.1) {
        state = 'die';
    }

    if (battery.charging) {
        chargingEl.classList.remove('hidden');
        state = 'run';
    } else {
        chargingEl.classList.add('hidden');
        if (state === 'run') {
            state = 'walk';
        }
    }
}

navigator.getBattery().then(function(battery) {
    // Update the battery status initially ...
    updateBatteryStatus(battery);

    // .. and for any subsequent updates.
    battery.addEventListener('chargingchange', function () {
      updateBatteryStatus(battery);
    });

    battery.addEventListener('levelchange', function () {
      updateBatteryStatus(battery);
    });

    battery.addEventListener('dischargingtimechange', function () {
      updateBatteryStatus(battery);
    });
});
