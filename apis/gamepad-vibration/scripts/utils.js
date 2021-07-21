export class Vector2 {
    constructor (x,y) {
        this.x = x
        this.y = y
    }
}

export function boxColl(pos, boxpos, boxsize) {
    return (
        (pos.x >= boxpos.x && pos.x <= boxpos.x + boxsize.x)
        && (pos.y >= boxpos.y && pos.y <= boxpos.y + boxsize.y)
    )
}