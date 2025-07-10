const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const canvas2 = document.getElementById('canvas2')
const ctx2 = canvas2.getContext('2d')
canvas2.width = window.innerWidth
canvas2.height = window.innerHeight

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = '01'
        this.x = x
        this.y = y
        this.fontSize = fontSize
        this.text = 'A'
        this.canvasHeight = canvasHeight
        this.color = 'hsl(' + (this.x * 3) + ',100%,50%)'
    }
    
    draw(context, context2) {
        context.font = this.fontSize + 'px monospace'
        context2.font = this.fontSize + 'px monospace'
        
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length))
        
        context.fillStyle = this.color
        context2.fillStyle = this.color
        
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize)
        context2.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize)
        
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.97) {
            this.y = 0
        } else {
            this.y += 1
        }
    }
}

class Effect {
    #initialize() {
        this.symbols = []
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight)
        }
    }
    
    constructor(canvasWidth, canvasHeight) {
        this.fontSize = 16
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.columns = this.canvasWidth / this.fontSize
        this.#initialize()
    }
    
    resize(width, height) {
        this.canvasWidth = width
        this.canvasHeight = height
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = []
        this.#initialize()
    }
}

const effect = new Effect(canvas.width, canvas.height)
let lastTime = 0
const fps = 60
const nextFrame = 1000 / fps
let timer = 0

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    timer += deltaTime
    
    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        ctx2.fillStyle = 'rgba(0, 0, 0, 0.05)'
        ctx2.fillRect(0, 0, canvas2.width, canvas2.height)
        
        effect.symbols.forEach(symbol => {
            symbol.draw(ctx, ctx2)
        })
        
        timer = 0
    }
    requestAnimationFrame(animate)
}
animate(0)
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas2.width = window.innerWidth
    canvas2.height = window.innerHeight
    effect.resize(canvas.width, canvas.height)
})