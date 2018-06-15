let div = document.getElementsByTagName("div")[0];
let img = div.childNodes[0];

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(evt) {
        img.style.webkitTransform = "rotateZ(" + evt.alpha + "deg)";
        img.style.transform = "rotateZ(" + evt.alpha + "deg)";
    }, false);
} else {
    alert("Browser nao suporta device orientation");
}