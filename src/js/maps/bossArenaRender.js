import { BaseRender } from "./renderBaseClass.js";
import { 
    Mrows, Mcols, tileSize, map, tileLocation, TILES 
} from "./bossArena.js";

export class BossArena extends BaseRender {
    constructor() {
        super(
            map,
            Mrows,
            Mcols,
            tileSize,
            "../../src/assets/sprites/tiles/world_tileset.png",
        );

        this.now = new Date();
        this.rndNumber = this.now.getHours() * 439 + this.now.getMinutes() * 577 + this.now.getSeconds() * 727;
    }

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

                if (tile === TILES.SPIKE) {
                    this.ctx.fillStyle = "#c0392b";
                    this.ctx.fillRect(tileX, tileY, this.tileSize, this.tileSize);
                }
            }
        }
    }

    render() {
        super.render();
        //TODO: Add boss
    }

}