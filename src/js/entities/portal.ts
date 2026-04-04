import { player } from "./player.js"; // keep JS import

export class Portal {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number, y: number, width = 64, height = 64) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
    }

    checkCollision(player: any): boolean {
        return (
            player.x < this.x + this.w &&
            player.x + player.w > this.x &&
            player.y < this.y + this.h &&
            player.y + player.h > this.y
        );
    }
}