
import Point from './point.js'

export default class Draw {
    constructor() {
        this.firstPoint = null;
        this.secondPoint = null;
    }
    drawLine(e, context) {
        if ( this.firstPoint == null ) {
            this.firstPoint = new Point(e.pageX, e.pageY);
            return;
        }
        else if ( this.secondPoint == null ) {
            this.secondPoint = new Point(e.pageX, e.pageY);
            context.strokeStyle = $('#color').val();
            context.moveTo(this.firstPoint.x, this.firstPoint.y);
            context.lineTo(this.secondPoint.x, this.secondPoint.y);
            context.stroke();
            this.resetParams()
        }
    }
    
    draw(x, y, isMouseDown, context){
        if (isMouseDown) {
            context.beginPath();
            context.strokeStyle = $('#color').val();
            context.moveTo(this.firstPoint.x, this.firstPoint.y);
            context.lineTo(x, y);
            context.closePath();
            context.stroke();
        }
        if(!this.firstPoint) {
            this.firstPoint = new Point(x,y);
        } else {
            this.firstPoint.updatePoints(x,y)
        }
    }
    
    clearArea(canvas){
        canvas.width = canvas.width
    }

    resetParams() {
        this.firstPoint = null;
        this.secondPoint = null;
    }
}