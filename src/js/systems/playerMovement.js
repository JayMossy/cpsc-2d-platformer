import { keys } from "./userInput.js";
import { Animator } from "./animator.js";
import { player } from "../entities/player";
import {
    applyGravity, clampFallSpeed,
    setMovementX, integrate
} from "./physics.js";

const spriteSheet = new Image();
if (localStorage.getItem("chosenCharacter") == "whiteShirt" || !localStorage.getItem("chosenCharacter")) {

    spriteSheet.src =
        "/assets/sprites/player/main_character/SpriteSheet/spritesheetmcwalkrun.png";
}
if (localStorage.getItem("chosenCharacter") == "RedShirt") {
    spriteSheet.src = "/assets/sprites/player/main_character_red_shirt/SpriteSheet/spritesheetmcrwalkrun.png";
}

export const playerAnimator = new Animator(spriteSheet, 48, 43);

playerAnimator.addAnimation("idle right", [0]);
playerAnimator.addAnimation("idle left", [1]);
playerAnimator.addAnimation("run right", [2, 3, 4, 5]);
playerAnimator.addAnimation("run left", [6, 7, 8, 9]);

export function playerMovement(dt) {
    playerAnimator.update(dt);

    let moveDirection = 0;

    applyGravity(player, dt);
    clampFallSpeed(player);

    if (keys.left && !keys.right) {
        moveDirection = -1;
        player.lastDir = "left";
    } else if (keys.right && !keys.left) {
        moveDirection = 1;
        player.lastDir = "right";
    }

    // base movement from input
    const moveVX = moveDirection * player.moveSpeed;

    // combine input movement + knockback
    player.vx = moveVX + player.knockbackX;
    player.vy += player.knockbackY;

    // decay knockback over time
    player.knockbackX *= 0.85;
    player.knockbackY *= 0.85;

    if (Math.abs(player.knockbackX) < 1) player.knockbackX = 0;
    if (Math.abs(player.knockbackY) < 1) player.knockbackY = 0;

    if (keys.up && player.grounded) {
        player.vy = -player.jump;
        player.grounded = false;
    }

    integrate(player, dt);

    if (moveDirection !== 0) {
        if (player.lastDir === "left") playerAnimator.setAnimation("run left");
        else playerAnimator.setAnimation("run right");
    } else {
        if (player.lastDir === "left") playerAnimator.setAnimation("idle left");
        else playerAnimator.setAnimation("idle right");
    }
}