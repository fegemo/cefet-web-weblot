import { GameEngine } from './engine.js'
import { Lane, fillRoundRect } from './utils.js'

const GMSTATE = {
    LOADING: 0,
    INGAME: 1,
    MAPPER: 2
}

class Game {
    #engine
    #gameState
    #context
    #gamepadConnected

    constructor(acceptance = 10, spd = 0.5) {
        this.acceptance = acceptance
        this.spd = spd

        this.#engine = new GameEngine(this.init, this.updateLoop, this.drawLoop)
        this.#engine.loadAssets([['title', 'images/output/title.png']])
        this.#engine.loadMusics(['B\'z-Into_Free'])
        this.#engine.run()
    }

    init = () => {
        window.addEventListener('gamepadconnected', e => {
            if (e.gamepad.index==0) {
                const gp = navigator.getGamepads()[e.gamepad.index]
                this.#gamepadConnected = true
                // console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.',
                //     gp.index, gp.id,
                //     gp.buttons.length, gp.axes.length)
                // console.log(this.getGamepadInput())
            }
        })
        this.setState(GMSTATE.LOADING)
    }

    setState(state) {
        this.#gameState = state
        switch(this.#gameState) {
            case GMSTATE.LOADING:
                break
            case GMSTATE.INGAME:
                this.ingameInit(this.#engine.musics['B\'z-Into_Free'])
                break
        }
    }

    updateLoop = (dt) => {
        switch(this.#gameState) {
            case GMSTATE.LOADING:
                const allMusicsReady = Object.keys(this.#engine.musics).reduce((acc, k) => acc && this.#engine.musics[k].isReady(), true)
                if (allMusicsReady) {
                    this.setState(GMSTATE.INGAME)
                }
                break
            case GMSTATE.INGAME:
                this.ingameUpdateLoop(dt)
                break
        }
    }

    drawLoop = (dt) => {
        switch(this.#gameState) {
            case GMSTATE.LOADING:
                break
            case GMSTATE.INGAME:
                this.ingameDrawLoop(dt)
                break
        }
    }

    // ========================================= ingame state
    ingameInit = (music) => {
        this.#context = {
            currentMusic: music,
            play: false,
            startCountdown: -1,
            hits: 0,
            lanes: [
                new Lane(115,181,100),
                new Lane(243,231,60),
                new Lane(207,67,49),
                new Lane(49,171,220)
            ]
        }
        // clean notes
        music.setNotesStroke(false)

        // current workaround to play audio
        window.addEventListener('gamepadconnected', () => (
            !this.#context.play
            && this.#context.startCountdown <= 0
            && this.startMusicCountdown()
        ))
    }

    ingameUpdateLoop = (dt) => {
        const input = this.getGamepadInput()
        this.#context.startCountdown = Math.max(0, this.#context.startCountdown - dt)
        
        // update lanes - ds4 mapping
        this.#context.lanes[0].pressed = input[6] // l2
        this.#context.lanes[1].pressed = input[4] // l1
        this.#context.lanes[2].pressed = input[5] // r1
        this.#context.lanes[3].pressed = input[7] // r2

        // check for stroke hits
        for(const note of this.#context.currentMusic.mapping) {
            if (this.#context.lanes[note.lane].pressed
                    && !note.stroke
                    && Math.abs(note.getOffset())*this.spd <= this.acceptance) {
                note.stroke = true
                this.#context.hits++
                console.log('hit')
            }
        }
    }

    ingameDrawLoop = (dt) => {
        const { ctx } = this.#engine
        const [ canvasWidth, canvasHeight ] = [ ctx.canvas.width, ctx.canvas.height ]
        const laneHeight = canvasHeight * 0.95
        const { startCountdown, play, lanes, currentMusic } = this.#context

        this.drawBg()

        if (startCountdown > 0) {
            this.drawCountdown()
        }

        for(const index in lanes) {
            lanes[index].draw(ctx, index)
        }

        if (play) {
            for(const note of currentMusic.mapping) {
                if (laneHeight - note.getOffset() <= canvasHeight && !note.stroke) {
                    note.draw(ctx, laneHeight, this.spd, this.acceptance)
                }
            }
            this.drawHitCount()
        }
    }

    // helpers
    getGamepadInput = () => {
        let buttons = []
        if (this.#gamepadConnected) {
            buttons = navigator.getGamepads()[0].buttons.map(b => b.pressed)
        }
        return buttons
    }

    startMusicCountdown = () => {
        this.#context.startCountdown = 3000
        setTimeout(() => {
            this.#context.currentMusic.play()
            this.#context.play = true
        }, this.#context.startCountdown)
    }

    drawCountdown = () => {
        const { ctx } = this.#engine
        const { startCountdown } = this.#context
        
        ctx.font = '80px arial'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(Math.ceil(startCountdown/1000)),
            ctx.canvas.width/2, ctx.canvas.height/2)
    }

    drawHitCount = () => {
        const { ctx } = this.#engine
        const { hits } = this.#context
        
        ctx.font = '80px arial'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(hits),
            ctx.canvas.width/11, ctx.canvas.height/2)
    }

    drawBg = () => {
        const { ctx } = this.#engine

        ctx.fillStyle = 'rgb(34,37,38)'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    // ========================================= ingame state
    drawTitle = () => {
        const [ ctx, title ] = [ this.#engine.ctx, this.#engine.assets.title ]
        const [ canvasWidth, canvasHeight ] = [ ctx.canvas.width, ctx.canvas.height ]
        const [ imgWidth, imgHeight ] = [ title.width/2, title.height/2 ]

        ctx.drawImage(title,
            canvasWidth/2 - imgWidth/2, canvasHeight/2 - imgHeight/2 + 15 * Math.sin(Date.now() * 0.0025),
            imgWidth, imgHeight)
    }
}

const game = new Game()
