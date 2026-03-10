import { map, tileSize } from "../tileMap.js";

const solidTiles = [3,4];
const horizontalBuffer = .3;
const verticalBuffer = .01;

function getTile(col,row){
     if(row < 0 || row >= map.length) return 4;
     if(col < 0 || col >= map[0].length) return 4;
     return map [row][col];
}
 export function horizontal(player){
    //Converts player position into tile coordinates
    const leftTile = Math.floor(player.x / tileSize);
    const rightTile = Math.floor((player.x + player.w - 1) / tileSize);
    const topTile = Math.floor(player.y / tileSize);
    const bottomTile = Math.floor((player.y + player.h - 1) / tileSize);
    for (let row = topTile; row <= bottomTile; row++){
        if(player.vx > 0){
            for(let col = rightTile; col >= leftTile;col--){
                if(solidTiles.includes(getTile(col,row))){
                    player.x = col * tileSize - player.w - horizontalBuffer;
                    player.vx = 0;
                    break;
                }
            }
        }else if(player.vx < 0){
            for(let col = leftTile; col <= rightTile; col++){
                if(solidTiles.includes(getTile(col,row))){
                    player.x = (col+1) * tileSize + horizontalBuffer;
                    player.vx = 0;
                    break;
                }
            }
        }
        if(player.vx === 0) break;
    }
 }
export function vertical(player){
    // Reset player's ground state
    player.grounded = false;
    //Converts player position into tile coordinates
    const leftTile = Math.floor(player.x / tileSize);
    const rightTile = Math.floor((player.x + player.w -1) / tileSize);
    const topTile = Math.floor(player.y / tileSize);
    const bottomTile = Math.floor((player.y + player.h - 1) / tileSize);
    //Loops through tiles touching the player
    for(let row = topTile; row <= bottomTile; row++){
        for(let col = leftTile; col <= rightTile; col++){
            if(solidTiles.includes(getTile(col,row))){
                if(player.vy > 0 ){
                    //falling - land on ground
                    player.y = row * tileSize - player.h - verticalBuffer;
                    player.vy = 0;
                    player.grounded = true;
                    break;
                }
                //jumping
                else if ( player.vy < 0){
                    player.y = (row + 1 ) * tileSize + verticalBuffer;
                    player.vy = 0;
                    break;
                }
                }

            }
        }
    }

