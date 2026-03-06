import { keys } from "./userInput.js";
import { canvas } from "./render.js";
import { Animator } from "./animator.js"

const gravity = 1250;

// Sprite sheet
const spriteSheet = new Image();
spriteSheet.src = 
"./src/assets/sprites/player/main_character/SpriteSheet/spritesheetmcwalkrun.png";

// Animator (Spritesheet width / 2)
export const animator = new Animator(spriteSheet, 48, 43);

// Add animations
animator.addAnimation("idle right", [0]);
animator.addAnimation("idle left", [1]);
animator.addAnimation("run right", [2, 3, 4, 5]);
animator.addAnimation("run left", [6, 7, 8, 9]);

export const player = {
    x: 50,
    y: 400,
    w: 40,
    h: 40,
    vx: 0, // pixels per second (speed)
    vy: 0,
    velocity: 500, // pixels per second when key held down
};

export function jump(dt) {
    if (keys.up && player.vy === 0) { 
        player.vy = -player.velocity;
        player.y += player.vy * dt; 
    }
}

// updates game based on delta time
export function playerMovement(dt) {

    animator.update(dt);

    // default
    player.vx = 0;
    // gravity
    // gravity is stronger when going down
    if (player.vy > 0 ) player.vy += gravity * 1.5 * dt; 
    else player.vy += gravity * dt;

    // horizontal - Fixed logic and added brackets
    if (keys.left && !keys.right) {
        player.vx = -player.velocity; 
        player.lastDir = "left"; 
    } 
    else if (keys.right && !keys.left) {
        player.vx = player.velocity; 
        player.lastDir = "right"; 
    }

    // Apply motion
    player.x += player.vx * dt;
    player.y += player.vy * dt;

    // console.log(player.vx);
    // console.log(player.vy)

    // Animations
    if (player.vx !== 0) {
        if (player.lastDir === "left") animator.setAnimation("run left");
        else animator.setAnimation("run right");
    } else {
        // If stopped, use last direction to pick the correct idle frame
        if (player.lastDir === "left") animator.setAnimation("idle left");
        else animator.setAnimation("idle right");
    }

    // Clamp to screen
    if (player.x < 0) player.x = 0;
    if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;
    if (player.y < 0) player.y = 0;
    if (player.y + player.h > canvas.height) player.y = canvas.height - player.h;
}