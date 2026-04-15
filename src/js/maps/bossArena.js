export const Mrows = 150;
export const Mcols = 300;
export const tileSize = 32;

export const TILES = {
  SKY: -1,
  DARK: 0,
  DIRT: 1,
  PAVED_FLOOR: 2,
  BRICK1: 3,
  BRICK2: 4,
  BROWN_BRICK1: 5,
  BROWN_BRICK2: 6,
  COLUMN_BOTTOM_LEFT: 7,
  COLUMN_BOTTOM_RIGHT: 8,
  COLUMN_MIDDLE_LEFT: 9,
  COLUMN_MIDDLE_RIGHT: 10,
  BACKGROUND: 11,
  FLOOR_CORNER: 12,
  FLOOR_LEFT: 13,
  TREE1: 24,
  TREE2: 25,
  SPIKE: -1
}
Object.freeze(TILES); // makes TILES object immutable

// Top left position in tile set
export const tileLocation = {
  tileSize: 16,
  dark: [16*1.5, 16*9.5],
  dirt: [16*1, 16*8],
  pavedFloor: [16*1, 16*2],
  brick1: [16*10, 16*0],
  brick2: [16*11, 16*0],
  brownBrick1: [16*10, 16*1],
  brownBrick2: [16*11, 16*1],
  colBtnL: [16*5, 16*11],
  colBtnR: [16*6, 16*11],
  colMidL: [16*5, 16*10],
  colMidR: [16*6, 16*10],
  background: [16*6, 16*15],
  floorCorner: [16*4, 16*2],
  floorLeft: [16*4, 16*3],
  tree1: [16*13, 16*5.5],
  tree2: [16*10.5, 16*48]
};

const now = new Date();
const rndNumber = 
      now.getHours() * 439 + 
      now.getMinutes() * 577 + 
      now.getSeconds() * 727;

export const map = Array.from({ length: Mrows }, () =>
  Array.from({ length: Mcols }, () => TILES.SKY)
);

// Outside square
// makePlatform(1, Mrows-30, 0, Mcols, TILES.BLACK, TILES.DIRT);

/* --- Beginning --- */

// Top floor
makeSquare(1, Mrows-25, 0, Mcols, TILES.DARK, TILES.DIRT)

// Top trees
makeSquare(Mrows-20, Mrows-20, 10, 10, TILES.TREE1);
makeSquare(Mrows-20, Mrows-20, 25, 25, TILES.TREE2);
makeSquare(Mrows-20, Mrows-20, 35, 35, TILES.TREE1);
makeSquare(Mrows-20, Mrows-20, 50, 50, TILES.TREE2);
makeSquare(Mrows-20, Mrows-20, 53, 53, TILES.TREE1);

// Mixing in tiles with dirt - to paved floor
mixTiles(25, [TILES.DIRT, TILES.BROWN_BRICK1], 50, 65);
mixTiles(25, [TILES.DIRT, TILES.BROWN_BRICK1, TILES.BRICK2], 65, 75);
mixTiles(25, [TILES.DIRT, TILES.BROWN_BRICK1, TILES.BROWN_BRICK2, TILES.BRICK2, TILES.BRICK1], 75, 80);
mixTiles(25, [TILES.BRICK2, TILES.BROWN_BRICK1, TILES.BRICK1, TILES.PAVED_FLOOR], 80, 95);
mixTiles(25, [TILES.BRICK2, TILES.PAVED_FLOOR], 95, 115);

// Top paved floor
makeSquare(1, Mrows-25, 115, Mcols, TILES.DARK, TILES.PAVED_FLOOR)
mixTiles(25, [TILES.BRICK1, TILES.PAVED_FLOOR], 115, 125);
// Columns
makeColumn(170, 24, 20);
makeColumn(180, 24, 20);
makeColumn(190, 24, 20);
makeColumn(200, 24, 20);

// Hole
makeSquare(5, Mrows, 215, 280, TILES.SKY);
makeSquare(5, Mrows-35, 215, 280, TILES.BACKGROUND);
makeSquare(15, Mrows-26, 214, 214, TILES.FLOOR_LEFT);
makeSquare(Mrows-25, Mrows-25, 214, 214, TILES.FLOOR_CORNER);

/* --- Inside --- */
// carving out inside square
makeSquare(5, 30, 50, 214, TILES.BACKGROUND);
// Columns
makeColumn(190, Mrows-5, 40)
makeColumn(185, Mrows-5, 40)
makeColumn(180, Mrows-5, 40)
// Top floor
makeSquare(5, 5, 0, 280, TILES.PAVED_FLOOR)



function mixTiles(y, tilesArr, start, stop) {
  for(let x = start; x < stop; x++){
    let i = Math.floor(Math.random() * tilesArr.length);

    map[y][x] = tilesArr[i];
  }
}

function makeColumn(x, y, height) {
  map[y][x] = TILES.COLUMN_BOTTOM_LEFT;
  map[y][x+1] = TILES.COLUMN_BOTTOM_RIGHT;
  for(let i = 0; i < height; i++){
    y--;
    map[y][x] = TILES.COLUMN_MIDDLE_LEFT;
    map[y][x+1] = TILES.COLUMN_MIDDLE_RIGHT;
  }
}

/**
* Makes squares, you can set the top tile as a different one
* @param {*} bottom - Bottom start position
* @param {*} top - Top end position
* @param {*} left - Left start position
* @param {*} right - Right end position
* @param {*} tile - Tile type
* @param {*} topTile - Tile type for top tile, leave empty if you don't want a different type on top
*/
export function makeSquare(bottom, top, left, right, tile, topTile = tile) {
  for (let x = left; x <= right; x++) {
    for (let y = bottom; y < top; y++) {
      map[Mrows - y][x] = tile;
    }
    map[Mrows - top][x] = topTile;
  }
}