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
  FLOOR_CORNER_LEFT: 12,
  FLOOR_LEFT: 13,
  FLOOR_CORNER_RIGHT: 14,
  FLOOR_RIGHT : 15,
  CEILING: 16,
  CEILING_RIGHT: 17,
  CEILING_LEFT: 18,
  CHAIR: 19, 
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
  floorCornerL: [16*4, 16*2],
  floorLeft: [16*4, 16*3],
  floorCornerR: [16*0, 16*2],
  floorRight: [16*0, 16*3],
  ceil: [16*1, 16*5],
  ceilR: [16*0, 16*5],
  ceilL: [16*4, 16*5],
  tree1: [16*13, 16*5.5],
  tree2: [16*10.5, 16*48],
  chair: [700, 300]
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

// Top dirt
makeSquare(1, Mrows-25, 0, Mcols, TILES.DARK, TILES.DIRT)

// Top trees
makeSquare(Mrows-20, Mrows-20, 3, 3, TILES.TREE1);
makeSquare(Mrows-20, Mrows-20, 5, 5, TILES.TREE2);
makeSquare(Mrows-20, Mrows-20, 12, 12, TILES.TREE1);
makeSquare(Mrows-20, Mrows-20, 13, 13, TILES.TREE1);
makeSquare(Mrows-20, Mrows-20, 20, 20, TILES.TREE2);
makeSquare(Mrows-20, Mrows-20, 25, 25, TILES.TREE2);
makeSquare(Mrows-20, Mrows-20, 30, 30, TILES.TREE1);
makeSquare(Mrows-20, Mrows-20, 35, 35, TILES.TREE1);
makeSquare(Mrows-20, Mrows-20, 40, 41, TILES.TREE2);
makeSquare(Mrows-20, Mrows-20, 50, 50, TILES.TREE2);
makeSquare(Mrows-20, Mrows-20, 55, 55, TILES.CHAIR);

// Mixing in tiles with dirt - to paved floor
mixTiles(25, [TILES.DIRT, TILES.BROWN_BRICK1], 50, 65);
mixTiles(25, [TILES.DIRT, TILES.BROWN_BRICK1, TILES.BRICK2], 65, 75);
mixTiles(25, [TILES.DIRT, TILES.BROWN_BRICK1, TILES.BROWN_BRICK2, TILES.BRICK2, TILES.BRICK1], 75, 80);
mixTiles(25, [TILES.BRICK2, TILES.BROWN_BRICK1, TILES.BRICK1, TILES.PAVED_FLOOR], 80, 95);
mixTiles(25, [TILES.BRICK2, TILES.PAVED_FLOOR], 95, 115);

// Top paved floor
makeSquare(1, Mrows-25, 115, Mcols, TILES.DARK, TILES.PAVED_FLOOR)
mixTiles(25, [TILES.BRICK1, TILES.PAVED_FLOOR], 115, 125);

// Room
makeSquare(Mrows-24, Mrows, 150, Mcols, TILES.BACKGROUND);
// Columns
makeColumn(160, 24, 20);
makeColumn(170, 24, 20);
makeColumn(180, 24, 20);
makeColumn(190, 24, 20);
makeColumn(200, 24, 20);
makeColumn(210, 24, 20);

// Ceil
makeSquare(Mrows-15, Mrows, 150, Mcols, TILES.DARK);
makeSquare(Mrows-15, Mrows-15, 150, Mcols, TILES.CEILING)
makeSquare(Mrows-15, Mrows, 150, 150, TILES.FLOOR_RIGHT)
makeSquare(Mrows-15, Mrows-15, 150, 150, TILES.CEILING_RIGHT)
makeSquare(Mrows-15, Mrows, 214, 214, TILES.FLOOR_LEFT)
makeSquare(Mrows-15, Mrows-15, 214, 214, TILES.CEILING_LEFT)

makeSquare(Mrows-15, Mrows, 281, 281, TILES.FLOOR_RIGHT)
makeSquare(Mrows-15, Mrows-15, 281, 281, TILES.CEILING_RIGHT)


// Hole
makeSquare(5, Mrows, 215, 280, TILES.BACKGROUND);
makeSquare(15, Mrows-26, 214, 214, TILES.FLOOR_LEFT);
makeSquare(Mrows-25, Mrows-25, 214, 214, TILES.FLOOR_CORNER_LEFT);
makeSquare(6, Mrows-26, 280, 280, TILES.FLOOR_RIGHT);
makeSquare(5, 5, 280, 280, TILES.DARK)
makeSquare(Mrows-25, Mrows-25, 280, 280, TILES.FLOOR_CORNER_RIGHT);


/* --- Inside --- */
// carving out inside square
makeSquare(5, 30, 50, 214, TILES.BACKGROUND, TILES.CEILING);
makeSquare(5, 60, 4, 50, TILES.BACKGROUND, TILES.CEILING);
// Columns
makeColumn(190, Mrows-5, 24)
makeColumn(185, Mrows-5, 24)
makeColumn(180, Mrows-5, 24)
makeColumn(175, Mrows-5, 24)
makeColumn(170, Mrows-5, 24)
makeColumn(165, Mrows-5, 24)
// Top floor
makeSquare(5, 5, 0, 279, TILES.PAVED_FLOOR)

// Chair
makeSquare(10, 10, 15, 15, TILES.CHAIR);




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