const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const GRAVITY = 0.7

c.fillRect(0, 0, canvas.width, canvas.height)


const background = new Sprite({position: {x: 0, y: 0}, imageSrc: './source/graphics/background.png'})

const shop = new Sprite({position: {x: 600, y: 128}, imageSrc: './source/graphics/shop.png', scale: 2.75, framesMax: 6})

const player = new Fighter({
    position: {x: 150, y: 0}, 
    velocity: {x: 0, y: 10},
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: 'source/graphics/samuraiMack/Idle.png',
    scale: 2.5,
    framesMax: 8,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: 'source/graphics/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: 'source/graphics/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: 'source/graphics/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: 'source/graphics/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: 'source/graphics/samuraiMack/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: 'source/graphics/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: 'source/graphics/samuraiMack/Death.png',
            framesMax: 6
        }
    },
    attackBox:{
        offset: {
            x: 100,
            y: 50,
        },
        width: 160,
        height: 50
    }
})

const enemy = new Fighter({
    position: {x: 800, y: 100},
    velocity: {x: 0, y: 10},
    color: 'yellow',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: 'source/graphics/kenji/Idle.png',
    scale: 2.5,
    framesMax: 4,
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: {
            imageSrc: 'source/graphics/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: 'source/graphics/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: 'source/graphics/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: 'source/graphics/kenji/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: 'source/graphics/kenji/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: 'source/graphics/kenji/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: 'source/graphics/kenji/Death.png',
            framesMax: 7
        }
    },
    attackBox:{
        offset: {
            x: -170,
            y: 50,
        },
        width: 170,
        height: 50
    }

})


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
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movement
    
    if(keys.d.pressed && player.lastKey === 'd'){
        player.switchSprite('run')
        player.velocity.x = 5
    }else if(keys.a.pressed && player.lastKey === 'a'){
        player.switchSprite('run')
        player.velocity.x = -5
    } else {
        player.switchSprite('idle')
    }

    //jumping
    if(player.velocity.y < 0){
        player.switchSprite('jump')
    } else if(player.velocity.y > 0){
        player.switchSprite('fall') //falling
    }

    

    //enemy movement
    if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.switchSprite('run')
        enemy.velocity.x = 5
    }else if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.switchSprite('run')
        enemy.velocity.x = -5
    } else {
        enemy.switchSprite('idle')
    }

    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    } else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall') //falling
    }

    //detect for collision

    if(collision({rectangle1: player, rectangle2: enemy}) && player.isAttacking && player.frameCurrent === 4)
    {
        player.isAttacking = false
        enemy.takeHit()
       // document.querySelector('#enemy-health').style.width = enemy.health + '%'
        gsap.to('#enemy-health', {
            width: enemy.health + '%'
        })

    }

    if(player.isAttacking && player.frameCurrent === 4){
        player.isAttacking = false
    }

    if(collision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking && enemy.frameCurrent === 2)
    {
        enemy.isAttacking = false
        player.takeHit()
        //document.querySelector('#player-health').style.width = player.health + '%'
        gsap.to('#player-health', {
            width: player.health + '%'
        })
    }

    if(enemy.isAttacking && enemy.frameCurrent === 2){
        enemy.isAttacking = false
    }

    if(player.health <= 0 || enemy.health <= 0)
    {
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    //console.log(event.key)
    if(!player.dead){

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

            
        }
    }

    //enemy keys
    if(!enemy.dead){

        switch(event.key){
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

