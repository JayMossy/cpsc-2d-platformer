

// function getTile(col,row){
//     if(row< 0 || row >= map.length) return 0;
//     if(col < 0 || col >= map[0].length) return 0;

//     return map[row][col];
// } Will need to add this into map folder so the collison can tell what tile is there
const TILE_SIZE = 8;

function horizontal(){
    //Converts player position into tile coordinates
    const leftTile = Math.floor(player.x / TILE_SIZE);
    const rightTile = Math.floor((player.x + player.width-1) / TILE_SIZE);
    const topTile = Math.floor(player.y / TILE_SIZE);
    const bottomTile = Math.floor((player.y + player.height - 1) / TILE_SIZE);
//Loops through tiles touching the player
for(let row = topTile; row <= bottomTile; row++){
    for (let col = leftTile; col <= rightTile; col++){
        // Check if tile is solid
        if(getTile(col,row) === 1){ 

            if(player.vx >  0 ){
            player.x = col * TILE_SIZE - player.width;
            } 
            else if (player.vx < 0 ){
            player.x = ( col + 1) * TILE_SIZE;
            }
            player.vx = 0;
            }
        }
    }
}

function vertical(){
    // Reset player's ground state
    player.grounded = false;
    //Converts player position into tile coordinates
    const leftTile = Math.floor(player.x / TILE_SIZE);
    const rightTile = Math.floor((player.x + player.width-1) / TILE_SIZE);
    const topTile = Math.floor(player.y / TILE_SIZE);
    const bottomTile = Math.floor((player.y + player.height - 1) / TILE_SIZE);
    
    //Loops through tiles touching the player
    for(let row = topTile; row <= bottomTile; row++){
        for(let col = leftTile; col <= rightTile; col++){
            // Check if tile is solid
            if(getTile(col,row) === 1 ){

                if(player.vy > 0 ){
                    player.y = row * TILE_SIZE - player.height;
                    //Ground detection
                    player.grounded = true;
                }
                else if ( player.vy < 0){
                    player.y = (row + 1 ) * TILE_SIZE
                }
                //Stop vertical velocity
                player.vy = 0;
            }
        }
    }

}