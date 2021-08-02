let changeColor = document.querySelectorAll('.colors-item');

changeColor.forEach(element => {
    element.addEventListener('click', function(){
        context.strokeStyle = element.getAttribute('value');
        context.fillStyle  = element.getAttribute('value');
        element.classList.add('colors-item-active');

        others = document.querySelectorAll('.colors-item');

        others.forEach(other => {
            if(other.id != element.id){
                other.classList.remove('colors-item-active');
            }
        });
    });
});


let getDrawType = document.querySelectorAll('.draw-type');

getDrawType.forEach(element => {
    element.addEventListener('click', function(){
       drawType = element.getAttribute('value');
       element.classList.add('draw-type-active');
       others = document.querySelectorAll('.draw-type');
       others.forEach(other => {
           if(other.id != element.id){
               other.classList.remove('draw-type-active');
           }
       });
    });
});