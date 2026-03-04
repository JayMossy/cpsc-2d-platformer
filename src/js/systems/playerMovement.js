import { keys } from "./userInput.js";
import { canvas } from "./render.js";

const gravity = 1500;

export const player = {
    x: 50,
    y: 400,
    w: 40,
    h: 40,
    vx: 0, // pixels per second (speed)
    vy: 0,
    velocity: 600, // pixels per second when key held down
};

export function jump(dt) {
    if (keys.up && player.vy === 0) { 
        player.vy = -player.velocity;
        player.y += player.vy * dt; 
    }
}

// updates game based on delta time
export function playerMovement(dt) {

  // default
  player.vx = 0;
  // gravity
  // gravity is stronger when going down
  if (player.vy > 0 ) player.vy += gravity * 1.5 * dt; 
  else player.vy += gravity * dt;

  // horizontal
  if (keys.left && !keys.right) player.vx = -player.velocity;
  else if (keys.right && !keys.left) player.vx = player.velocity;

  // Apply motion
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  // Clamp to screen
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;
  if (player.y < 0) player.y = 0;
  if (player.y + player.h > canvas.height) player.y = canvas.height - player.h;
}