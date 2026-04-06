export class Portal {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;

        this.frameIndex = 0;
        this.frameTimer = 0;

        this.FRAME_COLS = 4;
        this.FRAME_ROWS = 2;
        this.TOTAL_FRAMES = 8;
        this.FRAME_SPEED = 0.1;

        this.frameWidth = image.width / this.FRAME_COLS;
        this.frameHeight = image.height / this.FRAME_ROWS;
    }

    update(deltaTime) {
        this.frameTimer += deltaTime;

        if (this.frameTimer >= this.FRAME_SPEED) {
            this.frameTimer = 0;
            this.frameIndex = (this.frameIndex + 1) % this.TOTAL_FRAMES;
        }
    }

    render(ctx) {
        const col = this.frameIndex % this.FRAME_COLS;
        const row = Math.floor(this.frameIndex / this.FRAME_COLS);

        ctx.drawImage(
            this.image,
            col * this.frameWidth,
            row * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.frameWidth,
            this.frameHeight
        );
    }
}