import Music from './music.js'

export class GameEngine {
    /**
     * @param {List[]} assetList - ['name', 'path']
     * @param {Function} init - () => {}
     * @param {Function} updateLoop - (dt) => {}
     * @param {Function} drawLoop - (dt) => {}
     */
    constructor(init = null, updateLoop = null, drawLoop = null) {
        this.updateLoop = updateLoop
        this.drawLoop = drawLoop
        this.init = init
        this.lastupd = -1
        this.musics = {}
        this.assets = {}

        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')
    }

    loadAssets(assetList = []) {
        this.assets = {}

        const load = (src) => {
            const img = new Image()
            img.src = src
            return img
        }

        for (const [assetName, assetPath] of assetList) {
            this.assets[assetName] = load(assetPath)
        }
    }

    loadSounds(musicList = []) {
        this.musics = {}

        const load = (musicName) => {
            const audio = new Music(musicName)
            return audio
        }

        for (const musicName of musicList) {
            this.musics[musicName] = load(musicName)
        }
    }

    run() {
        this.setUpCanvasSize()
        this.setUpLoops()
    }

    setUpCanvasSize() {
        this.ctx.canvas.width = window.innerWidth
        this.ctx.canvas.height = window.innerHeight
    
        window.addEventListener('resize', e => {
            this.ctx.canvas.width = e.target.innerWidth
            this.ctx.canvas.height = e.target.innerHeight
        })
    }

    setUpLoops() {
        this.lastupd = Date.now()
        const loop = () => {
            const now = Date.now()
            const dt = now - this.lastupd // ms
            this.lastupd = now

            this.#updateLoop(dt)
            this.#drawLoop(dt)

            window.requestAnimationFrame(loop)
        }

        if (this.init) {
            this.init()
        }
        window.requestAnimationFrame(loop)
    }


    // loops
    #updateLoop(dt) {
        if (this.updateLoop) {
            this.updateLoop(dt)
        }
    }

    #drawLoop(dt) {
        if (this.drawLoop) {
            this.drawLoop(dt)
        }
    }
}
