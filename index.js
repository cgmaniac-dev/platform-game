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
    constructor({x,y}){
        this.position = {
            x,
            y
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
const platforms  = [
    new Platform({
        x: 200,
        y: 100
    }),
    new Platform({
        x: 500,
        y: 300
    })
]

const key = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
let scrollOffset = 0
function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    
    platforms.forEach(platform => {
        platform.draw()
    })
    player.update()


    if (key.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }else if(key.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
        if (key.right.pressed){
            platforms.forEach(platform => {
                scrollOffset += 5
                platform.position.x -= 5
            })
        }else if(key.left.pressed){
            platforms.forEach(platform => {
                scrollOffset -= 5
                platform.position.x += 5
            }) 
        }
    }
    platforms.forEach(platform => {
        if (player.position.y + player.height<= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            (player.position.x + player.width >= platform.position.x && 
            player.position.x <= platform.position.x+platform.width)){
            player.velocity.y =0
        }
    })
    
    if (scrollOffset > 2000){
        console.log("you win")
    }
    
}

animate()

addEventListener('keydown',({keyCode})=>{
    switch(keyCode){
        case 38:
            player.velocity.y -=15
            break
        case 40:
            break
        case 39:
            key.right.pressed = true
            break
        case 37:
            key.left.pressed = true
    }
})

addEventListener('keyup',({keyCode})=>{
    switch(keyCode){
        case 38:
            break
        case 40:
            break
        case 39:
            key.right.pressed = false
            break
        case 37:
            key.left.pressed = false
    }
})