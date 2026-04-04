// ===== IMPORTS =====
import { checkHazard } from "./systems/mapCollision.js";
import { playerMovement } from "./systems/playerMovement.js";
import { render } from "./maps/render.js";
import { updateCollectables } from "./collectables/updateCollectables.js";
import { player } from "./entities/player.js";
import { Enemy } from "./entities/enemy.js";
// TypeScript compiled imports
import { Portal } from "./entities/portal.js";
import { getState, setState } from "./systems/gamestate.js";
// ===== GAME STATE =====
let lastTime = 0;
// ===== ENEMIES =====
export const enemies = [];
enemies.push(new Enemy(240, 1200));
enemies.push(new Enemy(1500, 1200));
// ===== PORTAL =====
const portal = new Portal(11000, 1400);
// ===== MAIN GAME LOOP =====
function loop(timestamp) {
    if (lastTime === 0)
        lastTime = timestamp;
    let dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    if (dt > 0.1)
        dt = 0.1;
    const state = getState();
    // ===== PLAYING STATE =====
    if (state === "playing") {
        playerMovement(dt);
        for (const enemy of enemies) {
            enemy.update(dt, player);
        }
        checkHazard(player);
        updateCollectables(dt);
        //  PORTAL TRIGGER
        if (portal.checkCollision(player)) {
            setState("intermission");
            showIntermission();
        }
    }
    // ===== BOSS STATE =====
    else if (state === "boss") {
        playerMovement(dt);
        for (const enemy of enemies) {
            enemy.update(dt, player);
        }
        // (future boss logic goes here)
    }
    render();
    requestAnimationFrame(loop);
}
// ===== START GAME =====
requestAnimationFrame(loop);
// ===== UI FUNCTIONS =====
function showIntermission() {
    document.getElementById("intermission-screen").classList.remove("d-none");
}
function hideIntermission() {
    document.getElementById("intermission-screen").classList.add("d-none");
}
// ===== BUTTON HANDLER =====
document.getElementById("startBossBtn").addEventListener("click", () => {
    setState("boss");
    hideIntermission();
    // Move player to boss area
    player.x = 500;
    player.y = 1200;
});
