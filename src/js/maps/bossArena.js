export const Mrows = 60;
export const Mcols = 80;
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
  dirt: [
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

// Outside square
makePlatform(1, Mrows, 0, Mcols, TILES.DIRT)

// Inside empty square
makePlatform(4, Mrows-4, 3, Mcols-16, TILES.SKY)

// Boss chamber
makePlatform(5, 10, Mcols-15, Mcols-2, TILES.SKY)
makePlatform(5, 11, Mcols-14, Mcols-3, TILES.SKY)
makePlatform(5, 12, Mcols-13, Mcols-4, TILES.SKY)

// Grass floor
makePlatform(4, 4, 3, Mcols-2, TILES.GRASS)

// left platform
makePlatform(22, 22, 10, 21, TILES.DIRT)

// mid-left platform
makePlatform(10, 10, 25, 30, TILES.DIRT)

// middle platform
makePlatform(16, 16, 36, 51, TILES.GRASS)

// right platform
makePlatform(22, 22, 70, 80, TILES.DIRT)

// right ledge
makePlatform(22, 22, Mcols-17, Mcols-16, TILES.DIRT)

// right ledge top
makePlatform(28, 28, Mcols-16, Mcols-14, TILES.DIRT)

// right inside
makePlatform(35, 43, Mcols-15, Mcols-2, TILES.SKY)

/* optimizing randomization of dirt */
export const dirtVari = [];
const now = new Date();
const rndNumber = 
      now.getHours() * 439 + 
      now.getMinutes() * 577 + 
      now.getSeconds() * 727;

for (let y = 0; y < Mrows; y++){
  if (!dirtVari[y]) dirtVari[y] = [];

  for(let x = 0; x < Mcols; x++){
    let i = Math.ceil(Math.sqrt(x) * y * Math.pow(x, 2) * y + rndNumber) % tileLocation.dirt.length;

    dirtVari[y][x] = tileLocation.dirt[i];
  }
}

/**
* Makes vertical platfrom
* @param {*} bottom - Bottom start position
* @param {*} top - Top end position
* @param {*} left - Left start position
* @param {*} right - Right end position
* @param {*} tile - Tile type
* @param {*} topTile - Tile type for top tile, leave empty if you don't want a different type on top
*/
export function makePlatform(bottom, top, left, right, tile, topTile = tile) {
  for (let x = left; x <= right; x++) {
    for (let y = bottom; y < top; y++) {
      map[Mrows - y][x] = tile;
    }
    map[Mrows - top][x] = topTile;
  }
}