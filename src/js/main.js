import { collision } from "./systems/collision.js";
import { playerMovement, player } from "./systems/playerMovement.js";
import { render } from "./systems/render.js"
import { floor, platform1 } from "./objects.js";

let lastTime = 0; // Stores previous timestamp
// let gameState = "playing";

function loop(timestamp) {
    // Timestamp in milliseconds, convert to seconds
    if (lastTime === 0) lastTime = timestamp; // First Frame
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp

    render();
    playerMovement(dt);
    collision(player, floor, dt);
    collision(player, platform1, dt);
    requestAnimationFrame(loop);
}

// Start loop
requestAnimationFrame(loop);