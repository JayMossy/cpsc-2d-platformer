import { BaseRender } from "./renderBaseClass.js";
import {
    Mrows, Mcols, tileSize, map, tileLocation, TILES
} from "./level1Map.js";
import { coins } from "../collectables/coins.js";
import { hearts } from "../collectables/hearts.js";
import { enemies } from "../entities/enemy.js";
import { sword } from "../collectables/sword.js";

export class LevelOneMap extends BaseRender {
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
        this.sword = sword;
        this.enemies = enemies;

        this.now = new Date();
        this.rndNumber = this.now.getHours() * 439 + this.now.getMinutes() * 577 + this.now.getSeconds() * 727;
    }

    // When you override drawMap you'll make your own draw 
    // map function since each map might have a different amount of sprites
    // and some need a random number like this one and each will 
    // need their own specific details I think if not then
    // we can later just put draw map in the base class
    drawMap() {

        const ogSize = tileLocation.tileSize;
        const [gsx, gsy] = tileLocation.grass;

        for (let y = 0; y < Mrows; y++) {
            for (let x = 0; x < Mcols; x++) {
                const tileX = x * tileSize - this.camera.x;
                const tileY = y * tileSize - this.camera.y;

                if (
                    tileX < -tileSize ||
                    tileX > this.canvas.width ||
                    tileY < -tileSize ||
                    tileY > this.canvas.height
                ) continue;

                const tile = map[y][x];

                this.ctx.fillStyle = "rgba(0,0,0,0)";
                if (tile === TILES.WATER) this.ctx.fillStyle = "#2b4f81";
                if (tile === TILES.WATER_DARK) this.ctx.fillStyle = "#1a2f5a";

                this.ctx.fillRect(tileX, tileY, tileSize, tileSize);

                if (tile === TILES.GRASS) {
                    this.ctx.drawImage(this.tileSet, gsx, gsy, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.DIRT) {
                    let i = (
                        Math.ceil(Math.sqrt(x) * y * Math.pow(x, 2) * y + this.rndNumber) %
                        tileLocation.floors.length
                    );

                    let [fsx, fsy] = tileLocation.floors[i];
                    this.ctx.drawImage(this.tileSet, fsx, fsy, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                // Temporary Boxes, Spikes, and Door
                if (tile === TILES.BOX) {
                    this.ctx.fillStyle = "#8b5a2b";
                    this.ctx.fillRect(tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.SPIKE) {
                    this.ctx.fillStyle = "#c0392b";
                    this.ctx.fillRect(tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.DOOR) {
                    this.ctx.fillStyle = "#000000";
                    this.ctx.fillRect(tileX, tileY, tileSize, tileSize);
                }

            }
        }
    }

    // Can add more logic to this later
    door() {
        const px = this.player.x;
        const pxw = this.player.x + this.player.w;
        const py = this.player.y;
        const pyh = this.player.y + this.player.h;

        const doorLocation = {
            x: 2450,
            xw: 2450 + 300,
            y: 1450,
            yh: 1450 + 100
        }
        
        if (
            px > doorLocation.x &&
            pxw < doorLocation.xw &&
            py > doorLocation.y &&
            pyh < doorLocation.yh
        ) {
            this.ctx.fillStyle = "Black";
            this.ctx.font = "30px Arial Bold";
            this.ctx.textAlign = "center";

            this.ctx.fillText("Go to boss arena, click e!", this.canvas.width / 2, 60);

            this.canSwitch = true;
        }
    }

    // Some classes you might not have coins/enemies/only want to have some stuff
    // or maybe use a differnt list of coins for different maps
    render() {
        super.render();

        this.door();

        for (const enemy of enemies) {
            enemy.animator.draw(
                this.ctx,
                enemy.x - this.camera.x,
                enemy.y - this.camera.y + 8,
                enemy.w,
                enemy.h
            );
        }

        coins.forEach(coin => {
            coin.draw(this.ctx, this.camera);
            if (coin.checkCollision(this.player)) {
                this.player.collectedCoins++;
                coin.updateReact('coinCollected')
            }
        });

        hearts.forEach(heart => {
            heart.draw(this.ctx, this.camera);
            if (heart.checkCollision(this.player)) {
                heart.updateReact('heartCollected')
            }
        });

        sword.forEach(sword => {
            sword.draw(this.ctx, this.camera)
            if (sword.checkCollision(this.player)) {
                sword.updateReact('swordCollected')
            }
        })
    }

}