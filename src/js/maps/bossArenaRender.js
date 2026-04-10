import { BaseRender } from "./renderBaseClass.js";
import {
    Mrows, Mcols, tileSize, map,
    tileLocation, TILES, dirtVari
} from "./bossArena.js";

export class BossArena extends BaseRender {
    constructor(canvas) {
        super(
            canvas,
            map,
            Mrows,
            Mcols,
            tileSize,
            "/assets/sprites/tiles/world_tileset.png",
        );

        this.now = new Date();
        this.rndNumber = this.now.getHours() * 439 + this.now.getMinutes() * 577 + this.now.getSeconds() * 727;

        this.background = new Image();
        this.background.src = "/assets/backgrounds/boss-bg-good-3.png";
    }

    drawMap() {
        const t = this.canvas.width/3;
        const tt = this.canvas.width/2;

        this.ctx.drawImage(this.background, -t, -3, this.canvas.width/2, this.canvas.width/2);
        this.ctx.drawImage(this.background, -t+tt, -3, this.canvas.width/2, this.canvas.width/2);
        this.ctx.drawImage(this.background, -t+(2*tt), -3, this.canvas.width/2, this.canvas.width/2);

        const ogSize = tileLocation.tileSize;
        const [gsx, gsy] = tileLocation.grass;

        const startCol = Math.max(0, Math.floor(this.camera.x / tileSize));
        const endCol = Math.min(Mcols, Math.ceil((this.camera.x + this.canvas.width) / tileSize));

        const startRow = Math.max(0, Math.floor(this.camera.y / tileSize));
        const endRow = Math.min(Mrows, Math.ceil((this.camera.y + this.canvas.height) / tileSize));

        for (let y = startRow; y < endRow; y++) {
            for (let x = startCol; x < endCol; x++) {
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

                this.ctx.fillRect(tileX, tileY, this.tileSize, this.tileSize);

                if (tile === TILES.GRASS) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, gsx, gsy, ogSize, ogSize, tileX, tileY, this.tileSize, this.tileSize);
                }

                if (tile === TILES.DIRT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    let [fsx, fsy] = dirtVari[y][x];
                    this.ctx.drawImage(this.tileSet, fsx, fsy, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

            }
        }
    }

    render() {
        super.render();
        //TODO: Add boss
    }

}