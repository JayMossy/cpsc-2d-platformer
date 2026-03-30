export const Mrows = 60;
export const Mcols = 100;
export const tileSize = 32;


export const TILES = {
  SKY: 0,
  WATER: 1, 
  WATER_DARK: 2, //able to be changed
  GRASS: 3,
  DIRT: 4,
  BOX: 5,
  SPIKE: 6
}
Object.freeze(TILES); // makes TILES object immutable

// Top left position in tile set
export const tileLocation = {
  tileSize: 16,
  floors: [
    [0,16],
    [16,0],
    [16,16],
    [0,16]
  ],
  grass: [0,0]
};


export const map = Array.from({ length: Mrows }, () =>
  Array.from({ length: Mcols }, () => TILES.SKY)
);

export function createPlatform(row, startX, endX, tileType = TILES.GRASS) {
  for (let x = startX; x < endX; x++) {
    map[Mrows - row][x] = tileType;
  }
}




makePlatform(1, Mrows, 0, Mcols, TILES.DIRT)
makePlatform(8, Mrows-8, 5, Mcols-6, TILES.SKY)
makePlatform(8, 8, 5, Mcols-6, TILES.GRASS)


/**
* Makes vertical platfrom
* @param {*} bottom - Bottom start position
* @param {*} top - Top end position
* @param {*} left - Left beginning position
* @param {*} right - Right end position
* @param {*} tile - Tile type
* @param {*} topTile - Tile type for top tile, leave empty if you don't want a different type on top
*/
export function makePlatform(bottom, top, left, right, tile, topTile = tile) {
  for (let d = left; d <= right; d++) {
    for (let i = bottom; i < top; i++) {
      map[Mrows - i][d] = tile;
    }
    map[Mrows - top][d] = topTile;
  }
}