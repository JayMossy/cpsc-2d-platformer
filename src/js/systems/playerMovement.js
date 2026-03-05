import { keys } from "./userInput.js";
import { Animator } from "./animator.js";

const gravity = 1250;

const spriteSheet = new Image();
spriteSheet.src =
"./src/assets/sprites/player/main_character/SpriteSheet/spritesheetmcwalkrun.png";

export const animator = new Animator(spriteSheet, 48, 43);

animator.addAnimation("idle right", [0]);
animator.addAnimation("idle left", [1]);
animator.addAnimation("run right", [2,3,4,5]);
animator.addAnimation("run left", [6,7,8,9]);

export const player = {
  x: 200,
  y: 1500,
  w: 40,
  h: 40,
  vx: 0,
  vy: 0,
  velocity: 600,
  lastDir: "right"
};

export function playerMovement(dt) {

    animator.update(dt);

    player.vx = 0;

    if (player.vy > 0) player.vy += gravity * 1.5 * dt;
    else player.vy += gravity * dt;

    if (keys.left && !keys.right) {
        player.vx = -player.velocity;
        player.lastDir = "left";
    }

    else if (keys.right && !keys.left) {
        player.vx = player.velocity;
        player.lastDir = "right";
    }

    if (keys.up && player.vy === 0) {
        player.vy = -700;
    }

    player.x += player.vx * dt;
    player.y += player.vy * dt;

    if (player.vx !== 0) {
        if (player.lastDir === "left") animator.setAnimation("run left");
        else animator.setAnimation("run right");
    }
    else {
        if (player.lastDir === "left") animator.setAnimation("idle left");
        else animator.setAnimation("idle right");
    }
}