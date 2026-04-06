import { BaseRender } from "./renderBaseClass.js";
import {
    Mrows, Mcols, tileSize, map,
    tileLocation, TILES, dirtVari
} from "./level1Map.js";
import { coins } from "../collectables/coins.js";
import { hearts } from "../collectables/hearts.js";
import { enemies } from "../entities/enemy.js";
import { sword } from "../collectables/sword.js";
import { Portal } from "../entities/portal.js";

export class LevelOneMap extends BaseRender {
    constructor(canvas) {
        super(
            canvas,
            map,
            Mrows,
            Mcols,
            tileSize,
            "/assets/sprites/tiles/world_tileset.png",
        );

        this.portalImage = new Image();
        this.portalImage.src = "/assets/sprites/portals/portal_frames.png";

        this.background = new Image();
        const backgroundSources = [
            "/assets/backgrounds/level1/mario_lighter.png",
            "/assets/backgrounds/temp-menu-clouds-background.jpg",
            "/assets/backgrounds/sky.PNG"
        ];
        let sourceIndex = 0;
        this.background.onerror = () => {
            sourceIndex += 1;
            if (sourceIndex < backgroundSources.length) {
                this.background.src = backgroundSources[sourceIndex];
            }
        };
        this.background.src = backgroundSources[sourceIndex];

        this.portal = null;

        this.portalImage.onload = () => {
            this.portal = new Portal(2450, 1450, this.portalImage);
        };

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
        if (this.background.complete && this.background.naturalWidth > 0) {
            const bgWidth = this.background.naturalWidth;
            const bgHeight = this.background.naturalHeight;
            const bgScale = this.canvas.height / bgHeight;
            const drawWidth = bgWidth * bgScale;
            const parallaxX = -(this.camera.x * 0.2) % drawWidth;

            for (let x = parallaxX - drawWidth; x < this.canvas.width + drawWidth; x += drawWidth) {
                this.ctx.drawImage(this.background, x, 0, drawWidth, this.canvas.height);
            }
        } else {
            this.ctx.fillStyle = "#7fc8ff";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

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

                if (
                    tileX < -tileSize ||
                    tileX > this.canvas.width ||
                    tileY < -tileSize ||
                    tileY > this.canvas.height
                ) continue;

                const tile = map[y][x];

                if (tile === TILES.SKY) this.ctx.fillStyle = "rgba(0,0,0,0)";
                if (tile === TILES.WATER) this.ctx.fillStyle = "#2b4f81";
                if (tile === TILES.WATER_DARK) this.ctx.fillStyle = "#1a2f5a";

                this.ctx.fillRect(tileX, tileY, tileSize, tileSize);

                if (tile === TILES.GRASS) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, gsx, gsy, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.DIRT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
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


    // Some classes you might not have coins/enemies/only want to have some stuff
    // or maybe use a differnt list of coins for different maps
    render() {
        super.render();

        if (this.portal) {
            this.portal.update(1 / 60);
            this.portal.render(this.ctx, this.camera);

            const p = this.player;

            if (
                p.x < this.portal.x + this.portal.frameWidth &&
                p.x + p.w > this.portal.x &&
                p.y < this.portal.y + this.portal.frameHeight &&
                p.y + p.h > this.portal.y
            ) {
                this.ctx.fillStyle = "Black";
                this.ctx.font = "30px Arial Bold";
                this.ctx.textAlign = "center";

                this.ctx.fillText("Enter portal (E)", this.canvas.width / 2, 60);

                this.canSwitch = true;
            } else {
                this.canSwitch = false;
            }
        }

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