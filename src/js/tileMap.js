export const Mrows = 90;
export const Mcols = 150;
export const tileSize = 6;

/*
These make a tile map like this 
const map = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]
Every number 0-4 for now
corresponds to a color
we could later make it correspond to image later on?
*/

// Sky
const map = Array.from({ length: Mrows }, () =>
  Array.from({ length: Mcols }, () => 0)
);

// Grass
for (let i = Mrows-3; i > 60; i--) {
    map[i] = Array.from({ length: Mcols }, () => 3);
}

// River
map[Mrows-26] = Array.from({ length: Mcols }, ( ) => Math.ceil(Math.random()*2));
map[Mrows-25] = Array.from({ length: Mcols }, ( ) => 1);
map[Mrows-24] = Array.from({ length: Mcols }, ( ) => Math.ceil(Math.random()*2));
map[Mrows-23] = Array.from({ length: Mcols }, ( ) => Math.ceil(Math.random()*2));
map[Mrows-25] = Array.from({ length: Mcols }, ( ) => 1);

// Platform
map[Mrows-12] =  Array.from({ length: Mcols }, (_, i) => (i < Mcols/2) ? 3 : 4);

// Floor
map[Mrows-2] = Array.from({ length: Mcols }, () => 4);
map[Mrows-1] = Array.from({ length: Mcols }, () => 4);
map[Mrows] = Array.from({ length: Mcols }, () => 4);

export { map };
