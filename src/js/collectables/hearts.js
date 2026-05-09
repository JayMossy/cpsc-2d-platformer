import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";

const heartSpriteSheet = new Image();
heartSpriteSheet.src =
    "/assets/sprites/collectibles/heart_sheet.png";

export const heartAnimator = new Animator(heartSpriteSheet, 128, 74);
heartAnimator.addAnimation("spin", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
heartAnimator.setAnimation("spin");

class Heart extends Collectable {
    constructor(x, y) {
        super(x, y, 50, 50, heartAnimator);
    }
}

// Array that holds all the hearts
export const hearts = [
    // new Heart(300, 1300),
    // new Heart(1000, 1430),
    // new Heart(2100, 1300),
    // new Heart(3600, 1200),
    // new Heart(4100, 1450),
    // new Heart(4800, 1380),
    // new Heart(5600, 1210),
    // new Heart(6900, 1400),
    new Heart(7350, 1725),
    new Heart(8300, 1725),
    new Heart(9780, 1725),
    new Heart(10100, 1600),
    new Heart(16100, 1200)
];