export class Portal {
    constructor(x, y, framePaths) {
        this.x = x;
        this.y = y;

        this.frames = [];
        this.frameIndex = 0;
        this.frameTimer = 0;

        this.FRAME_SPEED = 0.4; // seconds per frame

        // Load all frames
        framePaths.forEach(path => {
            const img = new Image();
            img.src = path;
            this.frames.push(img);
        });

        this.width = 192;
        this.height = 192;
    }

    update(deltaTime) {
        this.frameTimer += deltaTime;

        if (this.frameTimer >= this.FRAME_SPEED) {
            this.frameTimer = 0;
            this.frameIndex = (this.frameIndex + 1) % this.frames.length;
        }
    }

    render(ctx, camera) {
        const img = this.frames[this.frameIndex];

        if (!img.complete) return;

        ctx.drawImage(
            img,
            this.x - camera.x,
            this.y - camera.y,
            this.width,
            this.height
        );
    }
}