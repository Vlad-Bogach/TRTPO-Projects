function collision({rectangle1, rectangle2}) {
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x 
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}

let timer = 30
let timerId

function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId)
    // document.querySelector('#gameover-label').style.display = 'flex'
    if(player.health === enemy.health){
        // document.querySelector('#gameover-label').innerHTML = 'Tie'
        return "tie"
    } else if (player.health > enemy.health){
        // document.querySelector('#gameover-label').innerHTML = 'Player win'
        return "player"
    } else if (player.health < enemy.health){
        // document.querySelector('#gameover-label').innerHTML = 'Enemy win'
        return "enemy"
    } 
}



function decreaseTimer(){
    
    if(timer > 0) 
    {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if(timer === 0){
        determineWinner({player, enemy, timerId})
    }
}

module.exports = {determineWinner}