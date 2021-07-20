class Game {
    #canvas
    #ctx
    #assets

    constructor() {
        this.#canvas = document.querySelector('canvas')
        this.#ctx = this.#canvas.getContext('2d');

        this.loadAssets()
        this.setUpCanvasSize()
        this.setUpLoops()
    }

    loadAssets() {
        this.#assets = {}

        const load = (src) => {
            const img = new Image()
            img.src = src
            return img
        }

        const assets = [['title', 'images/output/title.png']]
        for (const [assetName, assetPath] of assets) {
            this.#assets[assetName] = load(assetPath)
        }
    }

    setUpCanvasSize() {
        this.#ctx.canvas.width = window.innerWidth
        this.#ctx.canvas.height = window.innerHeight
    
        window.addEventListener('resize', e => {
            this.#ctx.canvas.width = e.target.innerWidth
            this.#ctx.canvas.height = e.target.innerHeight
        })
    }

    setUpLoops() {
        const loop = () => {
            this.gameLoop()
            this.drawLoop()
            window.requestAnimationFrame(loop)
        }
        window.requestAnimationFrame(loop)
    }


    // loops
    gameLoop() {
        // game logic goes here
    }

    drawLoop() {
        this.drawBg()
        this.drawTitle()
    }

    // helpers
    drawBg() {
        this.#ctx.fillStyle = 'rgb(30, 33, 34)'
        this.#ctx.fillRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)
    }

    drawTitle() {
        const [ctx, title] = [this.#ctx, this.#assets.title]
        const [imgWidth, imgHeight] = [title.width/2, title.height/2]

        ctx.drawImage(title,
            ctx.canvas.width/2 - imgWidth/2, ctx.canvas.height/2 - imgHeight/2 + 15*Math.sin(Date.now()*0.0025),
            imgWidth, imgHeight)
    }
}

const game = new Game()
