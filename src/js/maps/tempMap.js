import {
    Mrows, Mcols, tileSize, map, tileLocation, TILES
} from "./tileMap.js";
import { coins } from "../collectables/coins.js";
import { hearts } from "../collectables/hearts.js";
import { enemies } from "../entities/enemy.js";

import { BaseRender } from "./renderBaseClass.js";

export class TempMap extends BaseRender {
    constructor() {
        super(
            map,
            Mrows,
            Mcols,
            tileSize,
            "../../src/assets/sprites/tiles/world_tileset.png",
        );

        this.coins = coins;
        this.hearts = hearts;
        this.enemies = enemies;

        this.now = new Date();
        this.rndNumber = this.now.getHours() * 439 + this.now.getMinutes() * 577 + this.now.getSeconds() * 727;
    }

    // When you override drawMap you'll make your own draw 
    // map since each map might have a different amount of sprites
    // and some need a random number like this one and each will need their own specific details I think
    // if not then we can later just put draw map in the base class
    drawMap() {

        const ogSize = tileLocation.tileSize;
        const [gsx, gsy] = tileLocation.grass;

        for (let y = 0; y < this.mapRows; y++) {
            for (let x = 0; x < this.mapCols; x++) {
                const tileX = x * this.tileSize - this.camera.x;
                const tileY = y * this.tileSize - this.camera.y;

                if (
                    tileX < - this.tileSize ||
                    tileX > this.canvas.width ||
                    tileY < - this.tileSize ||
                    tileY > this.canvas.height
                ) continue;

                const tile = this.map[y][x];

                this.ctx.fillStyle = "rgba(0,0,0,0)";
                if (tile === TILES.WATER) this.ctx.fillStyle = "#2b4f81";
                if (tile === TILES.WATER_DARK) this.ctx.fillStyle = "#1a2f5a";

                this.ctx.fillRect(tileX, tileY, this.tileSize, this.tileSize);

                if (tile === TILES.GRASS) {
                    this.ctx.drawImage(this.tileSet, gsx, gsy, ogSize, ogSize, tileX, tileY, this.tileSize, this.tileSize);
                }

                if (tile === TILES.DIRT) {
                    let i = (
                        Math.ceil(Math.sqrt(x) * y * Math.pow(x, 2) * y + this.rndNumber) %
                        tileLocation.floors.length
                    );

                    let [fsx, fsy] = tileLocation.floors[i];
                    this.ctx.drawImage(this.tileSet, fsx, fsy, ogSize, ogSize, tileX, tileY, this.tileSize, this.tileSize);
                }

                // Temporary Boxes and Spikes
                if (tile === TILES.BOX) {
                    this.ctx.fillStyle = "#8b5a2b";
                    this.ctx.fillRect(tileX, tileY, this.tileSize, this.tileSize);
                }

                if (tile === TILES.SPIKE) {
                    this.ctx.fillStyle = "#c0392b";
                    this.ctx.fillRect(tileX, tileY, this.tileSize, this.tileSize);
                }
            }
        }
    }

    // Some classes you might not have coins/ enemies/ only want to have some stuff
    render() {
        super.render();

        for (const enemy of this.enemies) {
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(enemy.x - this.camera.x, enemy.y - this.camera.y, enemy.w, enemy.h);
        }

        this.coins.forEach(coin => {
            coin.draw(this.ctx, this.camera);
            coin.checkCollision(this.player);
            /* Could do ->
            if (coin.checkCollision(player)) player.score++;
            */
        });

        this.hearts.forEach(heart => {
            heart.draw(this.ctx, this.camera);
            heart.checkCollision(this.player);
            /* Could do ->
            if (coin.checkCollision(player)) player.score++;
            */
        });

    }


}