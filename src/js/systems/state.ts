import { Enemy } from "../entities/enemy";
import { Boss } from "../entities/boss";

export const enemies: Enemy[] = [];

export function initWorld() {
  enemies.length = 0;

  // normal enemies
  enemies.push(new Enemy(7100, 1200));
  enemies.push(new Enemy(7900, 1200));
  enemies.push(new Enemy(8700, 1200));
  enemies.push(new Enemy(9500, 1200));

  enemies.push(new Enemy(10300, 1200));
  enemies.push(new Enemy(11100, 1200));
  enemies.push(new Enemy(11500, 1200));
  enemies.push(new Enemy(12300, 1200));
  enemies.push(new Enemy(12700, 1200));
}

export function spawnEnemy(enemy: Enemy) {
  enemies.push(enemy);
}