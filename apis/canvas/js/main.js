import Draw from './draw.js'

const canvas = $('#canvas')[0];
const context = canvas.getContext('2d');
const drawObj = new Draw()
let mousePressed = false;

const removeListeners = () => {
    canvas.removeEventListener('click', e => drawObj.drawLine(e, context), false);
    $('#canvas').off('click')
    $('#canvas').off('mousedown')
    $('#canvas').off('mousemove')
    $('#canvas').off('mouseup')
    $('#canvas').off('mouseleave')
    drawObj.resetParams()
}

$('#line').click((e) => {
    removeListeners()
    canvas.addEventListener('click', e => drawObj.drawLine(e, context), false)
})

$('#free').click((e) => {
    removeListeners()

    $('#canvas').mousedown( (e) => {
        mousePressed = true;
        drawObj.draw(e.pageX - $('body').offset().left, e.pageY - $('body').offset().top, false, context);
    });

    $('#canvas').mousemove((e) => {
        if (mousePressed) {
            drawObj.draw(e.pageX - $('body').offset().left, e.pageY - $('body').offset().top, true, context);
        }
    });

    $('#canvas').mouseup((e) =>{
        mousePressed = false;
    });

    $('#canvas').mouseleave((e) => {
        mousePressed = false;
    });
})

$('#clear').click((e) => {
    removeListeners()
    drawObj.clearArea(canvas)
})

$('#save').click((e) => {
    let link = $('#link')[0];
    link.setAttribute('download', 'MyArt.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
})
