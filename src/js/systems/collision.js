import { map, tileSize } from "../tileMap.js";

export function tileCollision(player) {
    // Reset grounded to false each frame,
    // Only true if collision confirms player
    // is standing on ground.
    player.grounded = false;

    const left = Math.floor(player.x / tileSize);
    const right = Math.floor((player.x + player.w) / tileSize);
    const top = Math.floor(player.y / tileSize);
    const bottom = Math.floor((player.y + player.h) / tileSize);

    for (let y = top; y <= bottom; y++) {
        for (let x = left; x <= right; x++) {
            if (!map[y]) continue;

            const tile = map[y][x];

            if (tile === 4 || tile === 3) {
                const tileLeft = x * tileSize;
                const tileRight = tileLeft + tileSize;
                const tileTop = y * tileSize;
                const tileBottom = tileTop + tileSize;

                if (player.vy >= 0 && player.y + player.h <= tileTop + player.vy) {
                    player.grounded = true;
                    player.y = tileTop - player.h;
                    player.vy = 0;
                } else if (player.vy < 0 && player.y >= tileBottom + player.vy) {
                    player.y = tileBottom;
                    player.vy = 0;
                } else if (player.vx > 0 && player.x + player.w <= tileLeft + player.vx) {
                    player.x = tileLeft - player.w;
                    player.vx = 0;
                } else if (player.vx < 0 && player.x >= tileRight + player.vx) {
                    player.x = tileRight;
                    player.vx = 0;
                }
            }
        }
    }
}