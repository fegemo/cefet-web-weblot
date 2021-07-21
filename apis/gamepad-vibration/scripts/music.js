// todo - better music load/preload
export default class Music {
    constructor(name) {
        this.name = name
        this.path = `./musics/${name}`
        this.audio = new Audio(this.path + '.mp3')
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
}

export class Note {
    constructor(time, lane, music) {
        this.time = time
        this.lane = lane
        this.music = music
    }

    getY(laneHeight) {
        return laneHeight - (this.music.start + this.time - Date.now())
    }

    // from 1 to 0
    getOffset() {
        return (this.music.start + this.time) - Date.now()
    }
}
