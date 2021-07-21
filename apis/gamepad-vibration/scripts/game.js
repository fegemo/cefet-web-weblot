import { GameEngine } from './engine.js'

const GMSTATE = {
    MENU: 0,
    INGAME: 1,
    MAPPER: 2
}

class Game {
    #engine
    #gameState
    #context
    #gamepadConnected

    constructor() {
        this.#engine = new GameEngine(this.init, this.updateLoop, this.drawLoop)
        this.#engine.loadAssets([['title', 'images/output/title.png']])
        this.#engine.loadMusics(['B\'z-Into_Free'])
        this.#engine.run()
    }

    init = () => {
        this.#gameState = GMSTATE.INGAME
        window.addEventListener('gamepadconnected', e => {
            if (e.gamepad.index==0) {
                const gp = navigator.getGamepads()[e.gamepad.index]
                console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.',
                    gp.index, gp.id,
                    gp.buttons.length, gp.axes.length)
                this.#gamepadConnected = true
                console.log(this.getGamepadInput())
            }
        })
        this.ingameInit(this.#engine.musics['B\'z-Into_Free'])
    }

    updateLoop = (dt) => {
        switch(this.#gameState) {
            case GMSTATE.INGAME:
                this.ingameUpdateLoop(dt)
                break
        }
    }

    drawLoop = (dt) => {
        switch(this.#gameState) {
            case GMSTATE.INGAME:
                this.ingameDrawLoop(dt)
                break
        }
    }

    // ========================================= ingame state
    ingameInit = (music) => {
        const createLane = (color) => ({
            color: color,
            pressed: false
        })
        this.#context = {
            currentMusic: music,
            play: false,
            startCountdown: -1,
            lanes: [
                createLane('rgb(0,0,200)'),
                createLane('rgb(0,200,0)'),
                createLane('rgb(200,0,0)'),
                createLane('rgb(0,200,200)'),
            ]
        }

        // current workaround to play audio
        window.addEventListener('gamepadconnected', () => !this.#context.play && this.#context.startCountdown <= 0 && this.startMusicCountdown())
    }

    ingameUpdateLoop = (dt) => {
        const input = this.getGamepadInput()
        this.#context.startCountdown = Math.max(0, this.#context.startCountdown - dt)
        
        // ds4
        this.#context.lanes[0].pressed = input[6] // l2
        this.#context.lanes[1].pressed = input[4] // l1
        this.#context.lanes[2].pressed = input[5] // r1
        this.#context.lanes[3].pressed = input[7] // r2
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
            this.drawLane(lanes[index], index)
        }

        if (play) {
            for(const note of currentMusic.mapping) {
                if (note.getY(laneHeight) <= canvasHeight)
                this.drawNote(note)
            }
        }
    }

    // helpers
    getGamepadInput() {
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
        ctx.fillStyle = 'blue'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(Math.ceil(startCountdown/1000)),
            ctx.canvas.width/2, ctx.canvas.height/2)
    }

    drawLane = (lane, index) => {
        const { ctx } = this.#engine
        const [ canvasWidth, canvasHeight ] = [ ctx.canvas.width, ctx.canvas.height ]
        const lowerPadding = canvasHeight * 0.05
        const [ width, height ] = [ canvasWidth/9, canvasHeight - lowerPadding ]
        const [ x, y ] = [ canvasWidth/9 + canvasWidth/9 * (2*index), canvasHeight - lowerPadding ]
        
        const gradient = ctx.createLinearGradient(x,y,  x,y - height)
        const color = lane.pressed ? lane.color.replace('200', '255') : lane.color
        gradient.addColorStop(0, color)
        gradient.addColorStop(0.25, color)
        gradient.addColorStop(1, 'rgba(255,255,255, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, width, -height)
    }

    drawNote = (note) => {
        const { ctx } = this.#engine
        const [ canvasWidth, canvasHeight ] = [ ctx.canvas.width, ctx.canvas.height ]
        const laneHeight = canvasHeight * 0.95

        ctx.fillStyle = "yellow"
        const xSpace = canvasWidth/9
        ctx.fillRect(xSpace + xSpace * (2*note.lane), laneHeight - 1.5 * note.getOffset(),
            xSpace, 100)
    }

    drawBg = () => {
        const { ctx } = this.#engine

        ctx.fillStyle = 'black'
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
