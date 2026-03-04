import { Mrows, Mcols, tileSize,map } from "../tileMap.js";
import { player, animator } from "./playerMovement.js";
// import { animator } from "./playerMovement.js";

export const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = Mcols * tileSize;
canvas.height = Mrows * tileSize;

// Makes map from tile map
function makeMap() {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 0) {
                ctx.fillStyle = "rgba(0, 0, 255, 0.5)"; 
            } else if (map[y][x] === 1)  {
                ctx.fillStyle = "rgb(25, 53, 211)";
            } else if (map[y][x] === 2)  {
                ctx.fillStyle = "darkblue";
            } else if (map[y][x] === 3) {
                ctx.fillStyle = "rgb(44, 227, 7)";;
            } else if (map[y][x] === 4)  {
                ctx.fillStyle = "red"
            }
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}

export function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    makeMap();

    ctx.strokeStyle = "dark";
    ctx.strokeRect(player.x, player.y, player.w, player.h);
    animator.draw(
        ctx,
        player.x,
        player.y,
        player.w,
        player.h
    )
}