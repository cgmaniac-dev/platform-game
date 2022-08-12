const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

gravity = 0.5
class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 30
        this.height = 30
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x ,this.position.y ,this.width ,this.height)
    }

    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity
        }else{
            this.velocity.y = 0
        }
    }
}

class Platform {
    constructor(){
        this.position = {
            x: 200,
            y: 100
        }

        this.width = 200
        this.height = 20
    }

    draw(){
        c.fillStyle = 'blue'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }

    update(){
        this.draw()

    }
}

const player = new Player()
const platform = new Platform()

const key = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    platform.draw()
    player.update()


    if (key.right.pressed){
        player.velocity.x = 5
    }else if(key.left.pressed){
        player.velocity.x = -5
    } else player.velocity.x = 0

    if (player.position.y + player.height<= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y &&
        (player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x+platform.width)){
        player.velocity.y =0
    }
}

animate()

addEventListener('keydown',({keyCode})=>{
    switch(keyCode){
        case 38:
            console.log("Up")
            player.velocity.y -=15
            
            break
        case 40:
            console.log("Down")
            break
        case 39:
            console.log("Right")
            key.right.pressed = true
            break
        case 37:
            console.log("Left")
            key.left.pressed = true
    }
})

addEventListener('keyup',({keyCode})=>{
    switch(keyCode){
        case 38:
            console.log("Up")
            break
        case 40:
            console.log("Down")
            break
        case 39:
            console.log("Right")
            key.right.pressed = false
            break
        case 37:
            console.log("Left")
            key.left.pressed = false
    }
})