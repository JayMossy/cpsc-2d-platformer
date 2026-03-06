import { tileSize } from "./tileMap.js";
import { canvas } from "./systems/render.js";

export const floor = {
    x: 0,
    y: canvas.height - tileSize * 2,
    w: canvas.width,
    h: tileSize * 3,
}

export const platform1 = {
    x: canvas.width/2,
    y: canvas.height - (12 * tileSize),
    w: canvas.width/2,
    h: tileSize,
}