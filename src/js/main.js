import { checkHazard } from "./systems/mapCollision.js";
import { playerMovement } from "./systems/playerMovement.js";
import { render } from "./maps/render.js";
import { player } from "./entities/player.js";
import { updateCollectables } from "./collectables/updateCollectables.js";
// import { Enemy } from "./entities/enemy.js";
import { enemies } from "./entities/enemy.js";

let lastTime = 0;

// Was having bugs trying to access enemies list before
// it was made so moved it into the enemy.js file for now

// export const enemies = [];
// enemies.push(new Enemy(240, 1200))


function loop(timestamp) {

    if (lastTime === 0) lastTime = timestamp;

    let dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    if (dt > 0.1) dt = 0.1;

    playerMovement(dt);
    for (const enemy of enemies) {
        enemy.update(dt, player);
    }

    checkHazard(player);
    updateCollectables(dt);
    render();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);