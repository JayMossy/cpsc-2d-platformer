export class Enemy {
    constructor(x, y) {
        // position
        this.x = x
        this.y = y

        // size of enemy hitbox
        this.width = 32
        this.height = 32

        // speed of enemy
        this.speed = 80

        // statees for enemy like, patrol, follow, attack
        this.state = "patrol"

        // patroling variables
        this.patrolDir = -1      // -1 = left, 1 = right
        this.patrolTimer = 0
        this.patrolDuration = 2  // time before he turns around

        // range for attack and follow
        this.followRange = 80
        this.attackRange = 15
    }

    update(dt, player) {
        // finding the horizontal distance from player 
        let dx = player.x - this.x
        // makes sure distance is positive so patrolDir works
        let distance = Math.abs(dx)

        // changing states
        if (this.state === "patrol") {
            this.patrol(dt, distance)
        } else if (this.state === "follow") {
            this.follow(dt, dx, distance)
        } else if (this.state === "attack") {
            this.attack(distance)
        }
    }

    patrol(dt, distance) {
        // moves depending on patrolDir negativew or positive
        this.x = this.x + (this.speed * this.patrolDir * dt)

        // how long an enemy patrols one way
        this.patrolTimer = this.patrolTimer + dt

        // flip direction if over patrol timer
        if (this.patrolTimer > this.patrolDuration) {
            this.patrolDir = -this.patrolDir
            this.patrolTimer = 0
        }

        // check if player is close enough to follow
        if (distance < this.followRange) {
            this.state = "follow"
        }
    }

    follow(dt, dx, distance) {
        // find if player is in negative or postive direction
        let dir = 0
        if (dx !== 0) {
            dir = dx / Math.abs(dx)
        }

        // moves toward player
        this.x = this.x + (dir * this.speed * dt)

        // switch to attack if close
        if (distance < this.attackRange) {
            this.state = "attack"
        }
        // switch back to patrol if player too far
        else if (distance > this.followRange) {
            this.state = "patrol"
        }
    }

    attack(distance) {
        // if player moves out of attack range, follow again
        if (distance > this.attackRange) {
            this.state = "follow"
        }
    }

}

window.Enemy = Enemy;
    

