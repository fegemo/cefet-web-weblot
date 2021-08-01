(() => {
    const btn = document.querySelector("#acceptOrientation");

    // Display accept orientation button on ios devices
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
        btn.style.display = 'block';
        btn.addEventListener("click", requestDeviceOrientation);
    } else {
        btn.style.display = 'none';

    }

    // Check if device suports device orientation
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", handleOrientation);
    }
    else {
        alert("Sorry, your browser doesn't support Device Orientation");
    }


})();

// Request for device orientation permission on ios devices
function requestDeviceOrientation() {
    if (typeof window.DeviceOrientationEvent !== 'undefined' && typeof window.DeviceOrientationEvent.requestPermission === 'function') {
        window.DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                setResult(permissionState);
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);

                }
            }).catch(console.error);
    }
}

// Display permission value on ios devices
function setResult(result) {
    const btn = document.querySelector('#result');
    btn.innerHTML = 'Permissão: ' + result;
    btn.style.display = 'flex';
}

// Update ball position according to orientation
function handleOrientation(evt) {
    const ball = document.querySelector('#ball');
    const canvas = document.querySelector('#canvas');
    const output_beta = document.querySelector('#output-beta');
    const output_gama = document.querySelector('#output-gama');
    const maxX = canvas.clientWidth - ball.clientWidth;
    const maxY = canvas.clientHeight - ball.clientHeight;

    let x = evt.gamma; // In degree in the range [-90,90]
    let y = evt.beta;  // In degree in the range [-180,180]

    output_beta.innerHTML = y ? `Beta : ${y.toFixed(2)}\n` : `Beta :0\n`;
    output_gama.innerHTML = x ? `Gamma: ${x.toFixed(2)}\n` : `Gamma: 0\n`;

    // Shift the range of x and y to [0,180] and [0,360]
    x += 90;
    y += 180;

    // It center the positioning point to the center of the ball
    ball.style.top = (maxY * (y / 360)) + "px";
    ball.style.left = (maxX * (x / 180)) + "px";

}