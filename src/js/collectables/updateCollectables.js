import { coinAnimator } from "./coins.js";

export function updateCollectables(dt) {
    coinAnimator.update(dt);
}