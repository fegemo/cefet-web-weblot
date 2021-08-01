let canvas,
    context,
    dragging = false,
    dragStartLocation,
    snapshot,
    fillBox;

let drawType = "line";

function getCanvasCoordinates(event) {
    let x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}

function drawLine(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
}

function clearLine(position) {
    context.beginPath();
    context.clearRect(dragStartLocation.x, dragStartLocation.y, position.x, position.y);
    context.stroke();
    
}

function drawCircle(position) {
    let radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    context.beginPath();
    context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
}

function drawPolygon(position, sides, angle) {
    let coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }
    context.closePath();
}

function draw(position, shape) {
    if (shape === "circle") {
        drawCircle(position);
    }
    if (shape === "line") {
        drawLine(position);
    }
    if (shape === "polygon") {
        drawPolygon(position, 8, Math.PI / 4);
    }
    if (shape === "square") {
        drawPolygon(position, 4, Math.PI / 4);
    }
    if (shape === "triangle") {
        drawPolygon(position, 3, Math.PI / 4);
    }
    if (shape === "clear"){
        clearLine(position);
    }
    if (fillBox.checked) {
        context.fill();
    } else {
        context.stroke();
    }
}

function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
}

function drag(event) {
    let position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        draw(position, drawType);

    }
}

function dragStop(event) {
    dragging = false;
    restoreSnapshot();
    let position = getCanvasCoordinates(event);
    draw(position, drawType);
}

function init() {
    canvas = document.querySelector("#canvas");
    context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.lineWidth = 4;
    context.lineCap = 'round';
    fillBox = document.querySelector("#fillBox");

    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
}

window.addEventListener('load', init, false);
