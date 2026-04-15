import { BaseRender } from "./renderBaseClass.js";
import {
    Mrows, Mcols, tileSize, map,
    tileLocation, TILES
} from "./bossArena.js";

export class BossArena extends BaseRender {
    constructor(canvas) {
        super(
            canvas,
            map,
            Mrows,
            Mcols,
            tileSize,
            "/assets/sprites/tiles/boss-tiles-2.png",
        );

        this.now = new Date();
        this.rndNumber = this.now.getHours() * 439 + this.now.getMinutes() * 577 + this.now.getSeconds() * 727;

        this.background = new Image();
        this.background.src = "/assets/backgrounds/bg-boss-4.png";

        this.throne = new Image();
        this.throne.src = "/assets/backgrounds/throan.png";
    }

    drawMap() {
        const bgWidth = this.background.naturalWidth;
        const bgHeight = this.background.naturalHeight;
        const bgScale = this.canvas.height / bgHeight;
        const drawWidth = Math.floor(bgWidth * bgScale);
        const parallaxX = -(this.camera.x * 0.2) % drawWidth;

        for (let x = parallaxX - drawWidth; x < this.canvas.width + drawWidth; x += drawWidth) {
            this.ctx.drawImage(this.background, Math.floor(x), 0, drawWidth, this.canvas.height);
        }

        const ogSize = tileLocation.tileSize;
        // SourceX   ,   SourceY
        const [darkSourceX, darkSourceY] = tileLocation.dark;
        const [dirtSourceX, dirtSourceY] = tileLocation.dirt;
        const [pFloorSourceX, pFloorSourceY] = tileLocation.pavedFloor;
        const [brick1SourceX, brick1SourceY] = tileLocation.brick1;
        const [brick2SourceX, brick2SourceY] = tileLocation.brick2;
        const [bBrick1SourceX, bBrick1SourceY] = tileLocation.brownBrick1;
        const [bBrick2SourceX, bBrick2SourceY] = tileLocation.brownBrick2;
        const [colBtnLSourseX, colBtnLSourseY] = tileLocation.colBtnL;
        const [colBtnRSourseX, colBtnRSourseY] = tileLocation.colBtnR;
        const [colMidLSourseX, colMidLSourseY] = tileLocation.colMidL;
        const [colMidRSourseX, colMidRSourseY]  = tileLocation.colMidR;
        const [bgSourseX, bgSourseY] = tileLocation.background;
        const [floorLSourseX, floorLSourseY] = tileLocation.floorLeft;
        const [floorCrnLSourseX, floorCrnLSourseY] = tileLocation.floorCornerL;
        const [ceilSourceX, ceilSourceY] = tileLocation.ceil
        const [floorRSourseX, floorRSourseY] = tileLocation.floorRight;
        const [floorCrnRSourseX, floorCrnRSourseY] = tileLocation.floorCornerR;
        const [ceilRSourceX, ceilRSourceY] = tileLocation.ceilR;
        const [ceilLSourceX, ceilLSourceY] = tileLocation.ceilL;
        const [tree1SourceX, tree1SourceY] = tileLocation.tree1;
        const [tree2SourceX, tree2SourceY] = tileLocation.tree2;
        const [chiarSourceX, chiarSourceY] = tileLocation.chair;

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

                if (tile === TILES.DARK) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, darkSourceX, darkSourceY, ogSize, ogSize, tileX, tileY, this.tileSize, this.tileSize);
                }

                if (tile === TILES.DIRT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, dirtSourceX, dirtSourceY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }
                
                if (tile === TILES.PAVED_FLOOR) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, pFloorSourceX, pFloorSourceY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.BRICK1) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, brick1SourceX, brick1SourceY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.BRICK2) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, brick2SourceX, brick2SourceY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }
                
                if (tile === TILES.BROWN_BRICK1) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, bBrick1SourceX, bBrick1SourceY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.BROWN_BRICK2) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, bBrick2SourceX, bBrick2SourceY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.COLUMN_BOTTOM_LEFT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, colBtnLSourseX, colBtnLSourseY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.COLUMN_BOTTOM_RIGHT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, colBtnRSourseX, colBtnRSourseY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.COLUMN_MIDDLE_LEFT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, colMidLSourseX, colMidLSourseY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.COLUMN_MIDDLE_RIGHT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, colMidRSourseX, colMidRSourseY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.BACKGROUND) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, bgSourseX, bgSourseY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.FLOOR_CORNER_LEFT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, floorCrnLSourseX, floorCrnLSourseY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.FLOOR_LEFT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, floorLSourseX, floorLSourseY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.FLOOR_CORNER_RIGHT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, floorCrnRSourseX, floorCrnRSourseY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.FLOOR_RIGHT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, floorRSourseX, floorRSourseY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.CEILING) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, ceilSourceX, ceilSourceY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.CEILING_RIGHT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, ceilRSourceX, ceilRSourceY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.CEILING_LEFT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, ceilLSourceX, ceilLSourceY, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.TREE1) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, tree1SourceX, tree1SourceY, 16*4, 16*4.5, tileX, tileY, 16*10, 16*10);
                }

                if (tile === TILES.TREE2) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, tree2SourceX, tree2SourceY, 16*4, 16*4, tileX, tileY, 16*10, 16*10);
                }

                // if (tile === TILES.CHAIR) {
                //     if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                //     this.ctx.drawImage(this.throne, chiarSourceX, chiarSourceY, 500, 500, tileX, tileY, 16*20, 16*20);
                // }

            }
        }
    }

    render() {
        super.render();
        //TODO: Add boss
    }

}