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

const player = new Player()

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
    player.update()

    if (key.right.pressed){
        console.log('this')
        player.velocity.x = 5
    }else if(key.left.pressed){
        console.log('this')
        player.velocity.x = -5
    } else player.velocity.x = 0
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