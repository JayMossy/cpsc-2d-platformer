import { coinAnimator } from "./coins.js";
import { heartAnimator } from "./hearts.js";
import { swordAnimator } from "./sword.js";
import { speedUpAnimator, jumpUpAnimator, strengthUpAnimator } from "./powerUps"

export function updateCollectables(dt) {
    coinAnimator.update(dt);
    heartAnimator.update(dt);
    swordAnimator.update(dt);
    speedUpAnimator.update(dt);
    jumpUpAnimator.update(dt);
    strengthUpAnimator.update(dt);
}