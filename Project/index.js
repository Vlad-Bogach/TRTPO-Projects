const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 2048
canvas.height = 1152

c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor({position, velocity}) {
        this.position = position 
        this.velocity = velocity
        console.log('constructor')
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 100, 300)
    }

    update() {
        this.draw()
        this.position.y += 10 
        console.log('update')
    }
}

const player = new Sprite({
    position: {x: 0, y: 0}, 
    velocity: {x: 0, y: 0}})

const enemy = new Sprite({
    position: {x: 800, y: 200},
    velocity: {x: 0, y: 0}})

    player.draw();


function animate() {
    window.requestAnimationFrame(animate)
    player.update()
    
}

