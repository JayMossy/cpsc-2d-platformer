import { Animator } from "./animator.js";

const coinSpriteSheet = new Image();
coinSpriteSheet.src =
    "./src/assets/sprites/collectibles/coin.png";

export const coinAnimator = new Animator(coinSpriteSheet, 16, 16);

coinAnimator.addAnimation("spin", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
coinAnimator.setAnimation("spin");
