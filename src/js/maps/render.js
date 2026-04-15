import { LevelOneMap } from "./levelOneMapRender.js";
import { BossArena } from "./bossArenaRender.js";

let levelOne;
let bossArena;
let levels;
let canvas;

export function initializeLevels(gameCanvas) {
    canvas = gameCanvas;

    levelOne = new LevelOneMap(canvas);
    bossArena = new BossArena(canvas);

    levels = [levelOne, bossArena];
}

let currentLevel = 0;
let switchCooldown = 0;

window.addEventListener("movePlayerBack", () => {
    if (levelOne && levelOne.player && levelOne.portal) {
        const portal = levelOne.portal;

        // Move player slightly LEFT of portal
        levelOne.player.x = portal.x - 80;
        levelOne.player.y = portal.y;
    }
});

window.addEventListener("enterBoss", () => {
        currentLevel = 1;
        bossArena.setPlayerPos(540, 1605);
});

function moveMaps(dt) {
    const level = levels[currentLevel];

    // Cooldown to prevent instant bouncing between levels
    if (switchCooldown > 0) {
        switchCooldown -= dt;
        return;
    }

    // If portal collision triggered switch
    // if (level.canSwitch) {
    //     console.log("SWITCHING LEVEL"); 

    //     currentLevel = (currentLevel + 1) % levels.length;

    //     // Set spawn positions
    //     if (currentLevel === 0) {
    //         levelOne.setPlayerPos(2000, 1750);
    //     }

    //     if (currentLevel === 1) {
    //         bossArena.setPlayerPos(540, 1605);
    //     }

    //     // Reset so it doesn't instantly retrigger
    //     level.canSwitch = false;

    //     // Add delay so player doesn't bounce back
    //     switchCooldown = 1; // seconds
    // }
}

export function getCurrentLevel() {
    return currentLevel;
}

export function render(dt) {
    moveMaps(dt);
    levels[currentLevel].render();
}