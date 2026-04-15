import { applyGravity, clampFallSpeed, integrate } from "../systems/physics";

import { Animator } from "../systems/animator";
import type { Player } from "./player";

const enemySprite = new Image();
enemySprite.src = "/assets/sprites/enemies/level-one/troll_enemy/Sprite-For-Troll.png";

export interface EnemyState extends Damageable {
        x: number;
        y: number;
        spawnX: number;
        spawnY: number;
        w: number;
        h: number;
        vx: number;
        vy: number;
        moveSpeed: number;
        maxFallSpeed: number;
        direction: -1 | 1;
        grounded: boolean;
        health: number;
        maxHealth: number;
        damage: number;
        attackCooldown: number;
        attackTimer: number;
        isDead: boolean;
        knockbackX: number;
        knockbackY: number;

        // added this just for now to make them move
        // but i don't know how you want to code this stuff
        // so this is just temp for now
        animator: Animator;
        state: "patrol" | "follow" | "attack";
        facing: "left" | "right";
        patrolDir: number;
        patrolTimer: number;
        patrolDuration: number;
        followRange: number;
        attackRange: number;
}

export interface Damageable {
    health: number;
    maxHealth: number;
    isDead: boolean;
    vx: number;
    vy: number;
    knockbackX: number;
    knockbackY: number;
}

export class Enemy implements EnemyState {
    x: number;
    y: number;
    spawnX: number;
    spawnY: number;
    w: number;
    h: number;
    vx: number;
    vy: number;
    moveSpeed: number;
    maxFallSpeed: number;
    direction: 1 | -1;
    grounded: boolean;
    health: number;
    maxHealth: number;
    damage: number;
    attackCooldown: number;
    attackTimer: number;
    isDead: boolean;
    knockbackX: number;
    knockbackY: number;

    animator: Animator;
    state: "patrol" | "follow" | "attack";
    facing: "left" | "right";
    patrolDir: number;
    patrolTimer: number;
    patrolDuration: number;
    followRange: number;
    attackRange: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.spawnX = x;
        this.spawnY = y;
        this.w = 70;
        this.h = 70;
        this.vx = 0;
        this.vy = 0;
        this.moveSpeed = 100;
        this.maxFallSpeed = 1000;
        this.grounded = false;
        this.direction = -1;
        this.health = 3;
        this.maxHealth = 3;
        this.damage = 1;
        this.attackCooldown = 1000;
        this.attackTimer = 0;
        this.isDead = false;
        this.knockbackX = 0;
        this.knockbackY = 0;

        // animations
        this.animator = new Animator(enemySprite, 48, 48);
        this.animator.addAnimation("idle right", [0]);
        this.animator.addAnimation("idle left", [15]);
        this.animator.addAnimation("walk right", [1, 2, 3, 4]);
        this.animator.addAnimation("walk left", [16, 17, 18, 19]);
        this.animator.addAnimation("attack right", [10, 11, 12, 13]);
        this.animator.addAnimation("attack left", [5, 6, 7, 8]);
        // state
        this.state = "patrol";
        this.facing = "left";
        // patrol variables
        this.patrolDir = -1;
        this.patrolTimer = 0;
        this.patrolDuration = 2;
        // ranges
        this.followRange = 300;
        this.attackRange = 30;

    }

    update(dt: number, player: Player): void {

        // states
        let dx = player.x - this.x;
        let distance = Math.abs(dx);

        if (this.state === "patrol") {
            this.patrol(dt, distance); this.animator.setAnimation("walk " + this.facing);
        } else if (this.state === "follow") {
            this.follow(dx, distance); this.animator.setAnimation("walk " + this.facing);
        } else if (this.state === "attack") {
            this.attack(distance); this.animator.setAnimation("attack " + this.facing)
        }

        this.vx += this.knockbackX;
        this.vy += this.knockbackY;

        this.knockbackX *= 0.85;
        this.knockbackY *= 0.6;

        if (Math.abs(this.knockbackX) < 1) this.knockbackX = 0;

        applyGravity(this, dt);
        clampFallSpeed(this)

        this.grounded = false;

        integrate(this, dt);

        this.animator.update(dt);
    }

    patrol(dt: number, distance: number): void {
        this.moveSpeed = 100;
        this.vx = this.patrolDir * this.moveSpeed;

        this.patrolTimer += dt;

        if (this.patrolTimer >= this.patrolDuration) {
            this.patrolDir = -this.patrolDir;
            this.patrolTimer = 0;
        }

        if (distance < this.followRange) {
            this.state = "follow";
        }

        this.vx = this.patrolDir * this.moveSpeed;

        if (this.vx > 0) this.facing = "right";
        else if (this.vx < 0) this.facing = "left";
    }

    follow(dx: number, distance: number): void {
        this.moveSpeed = 250;
        let dir = dx !== 0 ? dx / Math.abs(dx) : 0;
        this.vx = dir * this.moveSpeed;

        if (distance < this.attackRange) {
            this.state = "attack";
        }
        else if (distance > this.followRange) {
            this.state = "patrol";
        }
        this.vx = dir * this.moveSpeed;

        if (this.vx > 0) this.facing = "right";
        else if (this.vx < 0) this.facing = "left";

    }

    attack(distance: number): void {
        this.vx = 0;

        if (distance > this.attackRange) {
            this.state = "follow";
        }
    }

    // update(dt: number, player: Player): void {
    //     if (this.isDead) return;
        
    //     if (this.attackTimer > 0) {
    //         this.attackTimer -= dt;
    //         if (this.attackTimer < 0) {
    //             this.attackTimer = 0;
    //         }
    //     }

    //     this.grounded = false;

    //     const distanceX = player.x - this.x;

    //     if (Math.abs(distanceX) < 300) {
    //         this.direction = distanceX < 0 ? -1 : 1;
    //         this.vx = this.direction * this.moveSpeed;
    //     } else {
    //         this.vx = this.direction * this.moveSpeed * 0.5;
    //     }

    //      this.x += this.vs * dt;
    // }
}

export const enemies: Enemy[] = [
    new Enemy(7100, 1200),
    new Enemy(7900, 1200),
    new Enemy(8700, 1200),
    new Enemy(9500, 1200),
    new Enemy(10300, 1200),
    new Enemy(11100, 1200),
    new Enemy(11500, 1200),
    new Enemy(12300, 1200),
    new Enemy(12700, 1200)
];