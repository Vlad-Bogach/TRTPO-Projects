const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const GRAVITY = 0.7

c.fillRect(0, 0, canvas.width, canvas.height)


const background = new Sprite({position: {x: 0, y: 0}, imageSrc: './source/graphics/background.png'})

const shop = new Sprite({position: {x: 600, y: 128}, imageSrc: './source/graphics/shop.png', scale: 2.75, framesMax: 6})

const player = new Fighter({
    position: {x: 0, y: 0}, 
    velocity: {x: 0, y: 10},
    color: 'red',
    offset: {
        x: 0,
        y: 0
    }})

const enemy = new Fighter({
    position: {x: 400, y: 100},
    velocity: {x: 0, y: 10},
    color: 'yellow',
    offset: {
        x: -50,
        y: 0
    }})


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }

}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    background.update()
    shop.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movement
    if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
    }else if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
    }

    //enemy movement
    if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
    }else if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
    }

    //detect for collision

    if(collision({rectangle1: player, rectangle2: enemy}) && player.isAttacking)
    {
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemy-health').style.width = enemy.health + '%'

    }

    if(collision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking)
    {
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#player-health').style.width = player.health + '%'
    }

    if(player.health <= 0 || enemy.health <= 0)
    {
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    //console.log(event.key)
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            keys.w.pressed = true
            if(player.position.y + player.height + 20 + 96>= canvas.height){
                player.velocity.y = -20
            }
            break
        case ' ':
            player.attack()
            break

        //enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            keys.w.pressed = true
            if(enemy.position.y + enemy.height + 20 + 96>= canvas.height){
                enemy.velocity.y = -20
            }
            break
        case '+':
            enemy.attack()
            break
    }
    

})

window.addEventListener('keyup', (event) => {
    //console.log(event.key)
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.w.pressed = false
            break
    }
})

