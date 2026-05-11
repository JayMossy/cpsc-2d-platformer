import { player } from "../entities/player";
import { animators } from "../systems/playerSetup.ts";

export class BaseRender {
    constructor(canvas, map, mapRows, mapCols, tileSize, spriteSheetSrc) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.map = map;
        this.mapRows = mapRows;
        this.mapCols = mapCols;
        this.tileSize = tileSize;

        this.tileSet = new Image();
        this.tileSet.src = spriteSheetSrc;

        this.camera = { x: 0, y: 0 };

        this.player = player;

        this.canSwitch = false;

        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());
        this.lastMode = "unarmed";
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    updateCamera() {
        const targetX = this.player.x + this.player.w / 2 - this.canvas.width / 2;
        const targetY = this.player.y + this.player.h / 2 - this.canvas.height / 2;

        this.camera.x += (targetX - this.camera.x) * 0.1;
        this.camera.y += (targetY - this.camera.y) * 0.1;

        const mapWidth = this.mapCols * this.tileSize;
        const mapHeight = this.mapRows * this.tileSize;

        this.camera.x = Math.max(0, Math.min(this.camera.x, mapWidth - this.canvas.width));
        this.camera.y = Math.max(0, Math.min(this.camera.y, mapHeight - this.canvas.height));

        this.camera.x = Math.round(this.camera.x);
        this.camera.y = Math.round(this.camera.y);
    }

    // Meant to be overriden
    drawMap() {
        throw new Error("drawMap() must be implemented by subclass");
    }

    setPlayerPos(x, y) {
        this.player.x = x;
        this.player.y = y;
    }

    // Can override to add coins, enemies, etc.
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.updateCamera();
        this.drawMap();

        const mode = this.player.mode || "unarmed";


        this.lastMode = mode;

        const current = animators[mode];
        if (!current) return;

        let activeAnimator;

        if (
            this.player.mode === "sword" &&
            this.player.attackTimer > 0 &&
            current.attack
        ) {
            activeAnimator = current.attack;
        } else if (!this.player.grounded) {
            activeAnimator = current.jump;
        } else {
            activeAnimator = current.idleRun;
        }

        if (activeAnimator) {
            activeAnimator.draw(
                this.ctx,
                this.player.x - this.camera.x,
                this.player.y - this.camera.y,
                this.player.w,
                this.player.h
            );
        }

    }
}