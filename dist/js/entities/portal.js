export class Portal {
    constructor(x, y, width = 64, height = 64) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
    }
    checkCollision(player) {
        return (player.x < this.x + this.w &&
            player.x + player.w > this.x &&
            player.y < this.y + this.h &&
            player.y + player.h > this.y);
    }
}
