// Key tracking
export const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false
};

window.addEventListener("keydown", (e) => {

    const key = e.key.toLowerCase();

    if (["arrowleft","arrowright","arrowup","arrowdown"," "].includes(key)) {
        e.preventDefault();
    }

    if (key === "arrowleft" || key === "a") keys.left = true;
    if (key === "arrowright" || key === "d") keys.right = true;
    if (key === "arrowup" || key === "w" || key === " ") keys.up = true;
    if (key === "arrowdown" || key === "s") keys.down = true;
});

window.addEventListener("keyup", (e) => {

    const key = e.key.toLowerCase();

    if (key === "arrowleft" || key === "a") keys.left = false;
    if (key === "arrowright" || key === "d") keys.right = false;
    if (key === "arrowup" || key === "w" || key === " ") keys.up = false;
    if (key === "arrowdown" || key === "s") keys.down = false;
});

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