import { fillRoundRect } from './utils.js'

export default class Music {
    #audioLoaded

    constructor(name) {
        this.name = name
        this.path = `./musics/${name}`
        this.audio = new Audio(this.path + '.mp3')
        this.audio.addEventListener('canplaythrough', () => { this.#audioLoaded = true })
        this.start = -1
        fetch(this.path + '.json')
            .then(r => r.json())
            .then(m => { this.mapping = m.map(n => new Note(n.time, n.lane, this)) })
            .catch(err => console.error(err))
    }

    play() {
        this.audio.play()
        this.start = Date.now()
    }

    stop() {
        this.audio.pause()
        this.audio.currentTime = 0
        this.start = -1
    }

    isReady() {
        return this.#audioLoaded && this.mapping instanceof Array
    }

    setNotesStroke(stroke) {
        if (this.mapping) {
            for(const note of this.mapping) {
                note.stroke = stroke
            }
        }
    }
}

export class Note {
    constructor(time, lane, music) {
        this.time = time
        this.lane = lane
        this.music = music
        this.stroke = false
    }

    // from 1 to 0
    getOffset() {
        return (this.music.start + this.time) - Date.now()
    }

    getHeight(spd, acceptance) {
        return acceptance / spd
    }

    isNearLaneEnd(spd, acceptance) {
        return Math.abs(this.getOffset()) <= this.getHeight(spd, acceptance)
    }

    draw(ctx, laneHeight, spd, acceptance) {
        const [ canvasWidth ] = [ ctx.canvas.width, ctx.canvas.height ]

        ctx.fillStyle = "yellow"
        const cellWidth = canvasWidth/11
        const noteHeight = this.getHeight(spd, acceptance) // same size of acceptance
        const radius = Math.min(cellWidth, noteHeight)/2
        fillRoundRect(ctx,
            2*cellWidth + cellWidth * (2*this.lane), laneHeight - spd * this.getOffset() - noteHeight/2, // center vertically
            cellWidth, noteHeight, radius)
    }
}
