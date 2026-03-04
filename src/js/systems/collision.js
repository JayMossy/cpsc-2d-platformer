import { jump } from "./playerMovement.js";

export function collision(mover, object, dt) {
    if (mover.x < object.x + object.w &&
        mover.x + mover.w > object.x &&
        mover.y < object.y + object.h &&
        mover.y + mover.h > object.y
    ) {
        mover.vy = 0;
        if (mover.x + mover.w < object.x + (mover.w/3)) {
            // Right
            mover.x = object.x - mover.w;
            mover.vx = 0;
            jump(dt); // Wall jump
        } else if (mover.x + 10 > object.x + object.w) {
            // Left 
            mover.x = object.b + object.w;
            mover.vx = 0;
        } else if (mover.y + mover.h > (object.y + object.h) + (mover.h/3)) {
            // Below
            mover.y = object.y + object.h + mover.h/2;
            mover.vy = 1
        } else if (mover.y + mover.h < object.y + mover.h) {
            // Above
            mover.vy = 0;
            mover.y = object.y - mover.h;
            jump(dt);
        }
    }
}


