export class Lane {
    constructor(r = 0, g = 0, b = 0, a = 1, pressed = false) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
        this.pressed = pressed
    }

    getColor(offset) {
        return `rgba(${this.r + offset}, ${this.g + offset}, ${this.b + offset}, ${this.a})`
    }

    draw(ctx, index) {
        const [ canvasWidth, canvasHeight ] = [ ctx.canvas.width, ctx.canvas.height ]
        const lowerPadding = canvasHeight * 0.05
        const [ width, height ] = [ canvasWidth/11, canvasHeight - lowerPadding ]
        const [ x, y ] = [ 2*canvasWidth/11 + canvasWidth/11 * (2*index), canvasHeight - lowerPadding ]
        
        const gradient = ctx.createLinearGradient(x,y,  x,y - height)
        const color = this.getColor(this.pressed ? 50 : 0)
        gradient.addColorStop(0, color)
        gradient.addColorStop(0.25, color)
        gradient.addColorStop(1, 'rgba(255,255,255, 0)')

        ctx.fillStyle = gradient
        const radius = width/4
        fillRoundRect(ctx, x, y-height-radius, width, height+radius, radius)
    }
}

// https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas
export function fillRoundRect (ctx, x, y, width, height, radius = 5) {
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    ctx.fill();
}
