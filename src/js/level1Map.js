export const Mrows = 60;
export const Mcols = 350;
export const tileSize = 32;

// Tiles IDs used throughout the game
export const TILE_SKY = 0;
export const TILE_WATER = 1;
export const TILE_GRASS = 3;
export const TILE_DIRT = 4;
export const TILE_BOX = 5; // solid tile
export const TILE_WATER_DARK = 2;
export const TILE_SPIKE = 6; // resets character to start

export const TILES = {
  SKY: 0,
  WATER: 1,
  WATER_DARK: 2,
  GRASS: 3,
  DIRT: 4,
  BOX: 5, // solid tile
  SPIKE: 6 // resets character to start
}

// Top left position in tile set
export const tileLocation = {
  tileSize: 16,
  floors: [
    [0,16],
    [16,0],
    [16,16],
    [32,16]
  ],
  grass: [0,0]
};

export const map = Array.from({ length: Mrows }, () =>
  Array.from({ length: Mcols }, () => TILES.SKY)
);

function setTile(row, col, tile){
  if (row >= 0 && row < Mrows && col >= 0 && col < Mcols){
    map[row][col] = tile;
  }
}
/* ------ Random pits with spikes ------*/
export function createRandomPits({
  minWidth = 4,
  maxWidth = 5,
  minGap = 12,
  maxGap = 25,
  minDepth = 2,
  maxDepth = 4,
} = {}) {
  let x = 10;

  while (x < Mcols - 10){
    x += Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap;
    if(x >= Mcols - 10) break;

    const width = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
    const depth = Math.floor(Math.random() * (maxDepth - minDepth + 1)) + minDepth;

    for(let i = 0; i < width; i++){
      const col = x + i;

      for(let d = 0; d <= depth; d++){
        setTile(Mrows - 2 - d, col, TILES.SKY);
      }
      //dirt
      setTile(Mrows - 1, col, TILES.DIRT);
      //spikes
      setTile(Mrows - 2, col, TILES.SPIKE);
    }
    x += width;
  }
  }

  /* ------ Random Platforms ------ */
  export function createRandomPlatforms({
    minWidth = 4,
    maxWidth = 10,
    minGap = 8, 
    maxGap = 18,
    minHeight = 10, 
    maxHeight = 12
  } = {}) {
    let x = 10;

    while (x < Mcols - 10){
      x += Math.floor(Math.random() * (maxGap - minGap)) + minGap;
      if(x >= Mcols - 10) break;

      const width = Math.floor(Math.random() * (maxWidth - minWidth)) + minWidth;
      const height = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;

      for(let i = 0; i < width; i++){
        setTile(Mrows - 1 - height, x + i, TILES.GRASS);
        setTile(Mrows - height, x + i, TILES.DIRT);
      }
      x += width;
    }
  }

/* ---------- FLOOR ---------- */
for (let y = Mrows - 3; y < Mrows; y++){
  for(let x = 0; x < Mcols; x++){
    map[y][x] = TILES.DIRT;
  }
}

/* ---------- GRASS TOP ---------- */

for (let x = 0; x < Mcols; x++){
  map[Mrows - 4][x] = TILES.GRASS;
}


/* ------ Generate Level ------ */

createRandomPits();

createRandomPlatforms();
