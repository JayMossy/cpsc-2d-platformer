import { map, tileSize, TILE_BOX, TILE_GRASS, TILE_DIRT, TILE_SPIKE } from "../level1Map.js";

const solidTiles = [TILE_BOX, TILE_GRASS, TILE_DIRT];
const horizontalBuffer = .3;
const verticalBuffer = .2;

function getTile(col,row) {
     if(row < 0 || row >= map.length) return -1;
     if(col < 0 || col >= map[0].length) return -1;
     return map [row][col];
}

// function to reset character to start location
function resetEntity(entity) {
    entity.x = 200;
    entity.y = 1500;
    entity.vx = 0;
    entity.vy = 0;
    entity.grounded = false;
}

export function horizontal(entity) {
    //Converts player position into tile coordinates
    const leftTile = Math.floor(entity.x / tileSize);
    const rightTile = Math.floor((entity.x + entity.w - 1) / tileSize);
    const topTile = Math.floor(entity.y / tileSize);
    const bottomTile = Math.floor((entity.y + entity.h - 1) / tileSize);
    for (let row = topTile; row <= bottomTile; row++){
        if(entity.vx > 0){
            for(let col = rightTile; col >= leftTile;col--){
                if(solidTiles.includes(getTile(col,row))){
                    entity.x = col * tileSize - entity.w - horizontalBuffer;
                    entity.vx = 0;
                    break;
                }
            }
        }else if(entity.vx < 0){
            for(let col = leftTile; col <= rightTile; col++){
                if(solidTiles.includes(getTile(col,row))){
                    entity.x = (col + 1) * tileSize + horizontalBuffer;
                    entity.vx = 0;
                    break;
                }
            }
        }
        if(entity.vx === 0) break;
    }
}

export function vertical(entity) {
    // Reset player's ground state
    entity.grounded = false;
    const leftTile = Math.floor((entity.x + 1) / tileSize);
    const rightTile = Math.floor((entity.x + entity.w - 1) / tileSize);
    
    // player falling
   if (entity.vy > 0) {
        const bottom = Math.floor((entity.y + entity.h - 1 + verticalBuffer) / tileSize);
        for (let col = leftTile; col <= rightTile; col++) {
            if (solidTiles.includes(getTile(col, bottom))) {
               
                entity.y = bottom * tileSize - entity.h;
                entity.vy = 0;
                entity.grounded = true;
                return;
                }
            }
        }
       else if (entity.vy < 0) {
        const top = Math.floor(entity.y / tileSize);
        for (let col = leftTile; col <= rightTile; col++) {
            if (solidTiles.includes(getTile(col, top))) {
                entity.y = (top + 1) * tileSize;
                entity.vy = 0;
                return;
            }
       }  
    }
}
   

export function checkHazard(entity) {
    //Converts player position into tile coordinates
    const leftTile = Math.floor(entity.x / tileSize);
    const rightTile = Math.floor((entity.x + entity.w -1) / tileSize);
    const topTile = Math.floor(entity.y / tileSize);
    const bottomTile = Math.floor((entity.y + entity.h - 1) / tileSize);

    for (let row = topTile; row <= bottomTile; row++) {
        for (let col = leftTile; col <= rightTile; col++){
            if (getTile(col, row) === TILE_SPIKE) {
                resetEntity(entity);
                return true;
            }
        }
    }
    return false;
}