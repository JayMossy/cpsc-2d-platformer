// Key tracking
export const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false,
};

// Key listeners
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = true;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = true;
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") keys.up = true;
    if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") keys.down = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = false;
  if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = false;
  if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") keys.up = false;
  if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") keys.down = false;
});