import { keys } from "./userInput.js";
import { player } from "../entities/player";
import {
    applyGravity,
    clampFallSpeed,
    setMovementX,
    integrate
} from "./physics.js";

const spriteSheet = new Image();
const characterSpriteSheets = {
    whiteShirt: "/assets/sprites/player/main_character/SpriteSheet/spritesheetmcwalkrun.png",
    RedShirt: "/assets/sprites/player/main_character_red_shirt/SpriteSheet/spritesheetmcrwalkrun.png"
};

function getSelectedCharacterSpriteSrc() {
    const chosenCharacter = localStorage.getItem("chosenCharacter");
    return characterSpriteSheets[chosenCharacter] || characterSpriteSheets.whiteShirt;
}

export function applySelectedCharacterSprite() {
    const nextSpriteSrc = getSelectedCharacterSpriteSrc();

    if (spriteSheet.src.endsWith(nextSpriteSrc)) {
        return;
    }

    spriteSheet.src = nextSpriteSrc;
    playerAnimator.frameIndex = 0;
    playerAnimator.frameTimer = 0;
}

export const playerAnimator = new Animator(spriteSheet, 48, 43);

playerAnimator.addAnimation("idle right", [0]);
playerAnimator.addAnimation("idle left", [1]);
playerAnimator.addAnimation("run right", [2, 3, 4, 5]);
playerAnimator.addAnimation("run left", [6, 7, 8, 9]);

applySelectedCharacterSprite();

window.addEventListener("characterChanged", applySelectedCharacterSprite);

export function playerMovement(dt) {

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

    const moveVX = moveDirection * player.moveSpeed;

    player.vx = moveVX + player.knockbackX;
    player.vy += player.knockbackY;

    player.knockbackX *= 0.85;
    player.knockbackY *= 0.85;

    if (Math.abs(player.knockbackX) < 1) player.knockbackX = 0;
    if (Math.abs(player.knockbackY) < 1) player.knockbackY = 0;

    if (keys.up && player.grounded) {
        player.vy = -player.jump;
        player.grounded = false;
    }

    integrate(player, dt);

    const current = animators[player.mode];

    if (!current) return;

    if (player.mode === "sword" && player.attackTimer > 0) {
        const current = animators[player.mode];

        const animName =
            player.lastDir === "left"
                ? "attack left"
                : "attack right";

        current.attack.setAnimation(animName);
        current.attack.update(dt);
    }

    if (!player.grounded) {

        const animName =
            player.vy < 0
                ? (player.lastDir === "left" ? "jump up left" : "jump up right")
                : (player.lastDir === "left" ? "fall left" : "fall right");

        current.jump.setAnimation(animName);
        current.jump.update(dt);

    } else {

        const animName =
            moveDirection !== 0
                ? (player.lastDir === "left" ? "run left" : "run right")
                : (player.lastDir === "left" ? "idle left" : "idle right");

        current.idleRun.setAnimation(animName);
        current.idleRun.update(dt);
    }
}