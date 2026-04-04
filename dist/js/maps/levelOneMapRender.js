import { BaseRender } from "./renderBaseClass.js";
import { Mrows, Mcols, tileSize, map, tileLocation, TILES, dirtVari } from "./level1Map.js";
import { coins } from "../collectables/coins.js";
import { hearts } from "../collectables/hearts.js";
import { enemies } from "../entities/enemy.js";
import { sword } from "../collectables/sword.js";
import { portal } from "../main.js";
const portalFrames = [];
for (let i = 0; i <= 3; i++) {
    const img = new Image();
    img.src = `../../src/assets/sprites/portals/portal_frame_${i}.png`;
    portalFrames.push(img);
}
export class LevelOneMap extends BaseRender {
    constructor() {
        super(map, Mrows, Mcols, tileSize, "../../src/assets/sprites/tiles/world_tileset.png");
        this.coins = coins;
        this.hearts = hearts;
        this.sword = sword;
        this.enemies = enemies;
    }
    // When you override drawMap you'll make your own draw 
    // map function since each map might have a different amount of sprites
    // and some need a random number like this one and each will 
    // need their own specific details I think if not then
    // we can later just put draw map in the base class
    drawMap() {
        const ogSize = tileLocation.tileSize;
        const [gsx, gsy] = tileLocation.grass;
        const startCol = Math.max(0, Math.floor(this.camera.x / tileSize));
        const endCol = Math.min(Mcols, Math.ceil((this.camera.x + this.canvas.width) / tileSize));
        const startRow = Math.max(0, Math.floor(this.camera.y / tileSize));
        const endRow = Math.min(Mrows, Math.ceil((this.camera.y + this.canvas.height) / tileSize));
        for (let y = startRow; y < endRow; y++) {
            for (let x = startCol; x < endCol; x++) {
                const tileX = x * tileSize - this.camera.x;
                const tileY = y * tileSize - this.camera.y;
                if (tileX < -tileSize ||
                    tileX > this.canvas.width ||
                    tileY < -tileSize ||
                    tileY > this.canvas.height)
                    continue;
                const tile = map[y][x];
                if (tile === TILES.SKY)
                    this.ctx.fillStyle = "rgba(0,0,0,0)";
                if (tile === TILES.WATER)
                    this.ctx.fillStyle = "#2b4f81";
                if (tile === TILES.WATER_DARK)
                    this.ctx.fillStyle = "#1a2f5a";
                this.ctx.fillRect(tileX, tileY, tileSize, tileSize);
                if (tile === TILES.GRASS) {
                    this.ctx.drawImage(this.tileSet, gsx, gsy, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }
                if (tile === TILES.DIRT) {
                    let [fsx, fsy] = dirtVari[y][x];
                    this.ctx.drawImage(this.tileSet, fsx, fsy, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }
                // Temporary Boxes and Spikes
                if (tile === TILES.BOX) {
                    this.ctx.fillStyle = "#8b5a2b";
                    this.ctx.fillRect(tileX, tileY, tileSize, tileSize);
                }
                if (tile === TILES.SPIKE) {
                    this.ctx.fillStyle = "#c0392b";
                    this.ctx.fillRect(tileX, tileY, tileSize, tileSize);
                }
            }
        }
    }
    // Can add more logic to this later
    // Some classes you might not have coins/enemies/only want to have some stuff
    // or maybe use a differnt list of coins for different maps
    render() {
        super.render();
        const frameIndex = Math.floor(Date.now() / 120) % portalFrames.length;
        const currentPortal = portalFrames[frameIndex];
        if (currentPortal.complete) {
            this.ctx.drawImage(currentPortal, portal.x - this.camera.x, portal.y - this.camera.y, 64, 64);
        }
        for (const enemy of enemies) {
            enemy.animator.draw(this.ctx, enemy.x - this.camera.x, enemy.y - this.camera.y + 8, enemy.w, enemy.h);
        }
        coins.forEach(coin => {
            coin.draw(this.ctx, this.camera);
            if (coin.checkCollision(this.player)) {
                this.player.collectedCoins++;
                coin.updateReact('coinCollected');
            }
        });
        hearts.forEach(heart => {
            heart.draw(this.ctx, this.camera);
            if (heart.checkCollision(this.player)) {
                heart.updateReact('heartCollected');
            }
        });
        sword.forEach(sword => {
            sword.draw(this.ctx, this.camera);
            if (sword.checkCollision(this.player)) {
                sword.updateReact('swordCollected');
            }
        });
    }
}
