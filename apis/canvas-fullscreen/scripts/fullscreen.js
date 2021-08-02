let canvasButton = document.getElementById("canvas-button");
let canvasElement = document.getElementById('canvas');
let bodyButton = document.getElementById("body-button");

canvasButton.addEventListener("click", function () {
    toggleFullscreen(canvasElement);
}, false);

bodyButton.addEventListener("click", function () {
    toggleFullscreen(document.documentElement);
}, false);

function toggleFullscreen(e) {
    rfs = e.requestFullscreen
    || e.webkitRequestFullScreen
    || e.mozRequestFullScreen
    || e.msRequestFullscreen 

    rfs.call(e)
    
}

document.addEventListener('fullscreenchange', on_fullscreen_change);
document.addEventListener('mozfullscreenchange', on_fullscreen_change);
document.addEventListener('webkitfullscreenchange', on_fullscreen_change);

function on_fullscreen_change() {
    if(document.mozFullScreen || document.webkitIsFullScreen || document.fullScreen) {
        let rect = canvasElement.getBoundingClientRect();
        canvasElement.width = rect.width;
        canvasElement.height = rect.height;
        // canvasElement.style.width = rect.width;
        // canvasElement.style.height = rect.height;
    }
    else {
        canvasElement.width = 600;
        canvasElement.height = 500;
        // canvasElement.style.width = 600;
        // canvasElement.style.height = 500;
    }
}
