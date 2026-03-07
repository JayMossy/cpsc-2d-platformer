import { tileCollision } from "./systems/collision.js";
import { playerMovement } from "./systems/playerMovement.js";
import { player } from "./entities/player.js";
import { render } from "./systems/render.js";

let lastTime = 0;

function loop(timestamp) {

    if (lastTime === 0) lastTime = timestamp;

    let dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    if (dt > 0.1) dt = 0.1;

    playerMovement(dt);
    tileCollision(player);
    render();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);