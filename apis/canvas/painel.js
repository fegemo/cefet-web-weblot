let changeColor = document.querySelectorAll('.colors-item');

changeColor.forEach(element => {
    element.addEventListener('click', function(){
       context.strokeStyle = element.getAttribute('value');
       context.fillStyle  = element.getAttribute('value');
    });
});


let getDrawType = document.querySelectorAll('.draw-type');

console.log(getDrawType);

getDrawType.forEach(element => {
    element.addEventListener('click', function(){
       drawType = element.getAttribute('value');
    });
});