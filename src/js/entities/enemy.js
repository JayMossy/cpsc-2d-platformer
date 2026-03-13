import { horizontal, vertical } from "../systems/mapCollision.js";
import { applyGravity, clampFallSpeed, integrate } from "../systems/physics.js";
import { Animator } from "../systems/animator.js";

const enemySprite = new Image();
enemySprite.src = "./src/assets/sprites/enemy/enemySheet.png";

const GRAVITY = 1250;

export class Enemy {
    constructor(x, y) {
        // position
        this.x = x;
        this.y = y;

        // size
        this.w = 32;
        this.h = 32;

        // horizontal movement
        this.vx = 0;
        this.moveSpeed = null;

        // vertical physics
        this.vy = 0;
        this.maxFallSpeed = 1000;
        this.grounded = false;

        // animations
        this.animator = new Animator(enemySprite, 48, 48);
        this.animator.addAnimation("idle", [0]);
        this.animator.addAnimation("walk", [1,2,3,4]);

        // state
        this.state = "patrol";

        // patrol variables
        this.patrolDir = -1;
        this.patrolTimer = 0;
        this.patrolDuration = 2;

        // ranges
        this.followRange = 300;
        this.attackRange = 15;
    }

    update(dt, player) {

        // states
        let dx = player.x - this.x;
        let distance = Math.abs(dx);

        if (this.state === "patrol") {
            this.patrol(dt, distance);
        } else if (this.state === "follow") {
            this.follow(dt, dx, distance);
        } else if (this.state === "attack") {
            this.attack(distance);
        }

        //Gravity
        if (this.vy > 0) {
            this.vy += GRAVITY * 1.5 * dt;
        } else {
            this.vy += GRAVITY * dt;
        }

        // clamp fall speed
        if (this.vy > this.maxFallSpeed) {
            this.vy = this.maxFallSpeed;
        }

        this.x += this.vx * dt;
        horizontal(this);

        this.y += this.vy * dt;
        this.grounded = false;
        vertical(this);
    }

    patrol(dt, distance) {
        this.moveSpeed = 100;
        this.vx = this.patrolDir * this.moveSpeed;

        this.patrolTimer += dt;

        if (this.patrolTimer > this.patrolDuration) {
            this.patrolDir = -this.patrolDir;
            this.patrolTimer = 0;
        }

        if (distance < this.followRange) {
            this.state = "follow";
        }
    }

    follow(dt, dx, distance) {
        this.moveSpeed = 250;
        let dir = dx !== 0 ? dx / Math.abs(dx) : 0;
        this.vx = dir * this.moveSpeed;

        if (distance < this.attackRange) {
            this.state = "attack";
        }
        else if (distance > this.followRange) {
            this.state = "patrol";
        }
    
    }

    attack(distance) {
        this.vx = 0;

        if (distance > this.attackRange) {
            this.state = "follow";
        }
    }
}