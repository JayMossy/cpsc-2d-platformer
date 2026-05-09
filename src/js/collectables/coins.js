import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";
import playSound from "../systems/soundsManager";

const coinSpriteSheet = new Image();
coinSpriteSheet.src =
    "/assets/sprites/collectibles/coin.png";

export const coinAnimator = new Animator(coinSpriteSheet, 16, 16);
coinAnimator.addAnimation("spin", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
coinAnimator.setAnimation("spin");

export class Coin extends Collectable {
    constructor(x, y) {
        super(x, y, 50, 50, coinAnimator);
    }

    playSound() {
        playSound("coin");
    }
}

// Array that holds all the coins
export const coins = [
    new Coin(650+150, 1450),
    new Coin(700+150, 1400),
    new Coin(750+150, 1350),

    new Coin(1150+150, 1550),
    new Coin(1200+150, 1550),

    new Coin(2100+150, 1550),
    new Coin(2150+150, 1525),
    new Coin(2200+150, 1500),

    new Coin(2400+150, 1350),
    new Coin(2450+150, 1350),
    new Coin(2500+150, 1350),

    new Coin(3155+150, 1545),
    new Coin(3200+150, 1560),
    new Coin(3250+150, 1560),
    new Coin(3300+150, 1560),
    
    new Coin(4000+150, 970),
    new Coin(4050+150, 970),
    new Coin(4100+150, 970),

    new Coin(5000, 1725),
    new Coin(5025, 1725),
    new Coin(5050, 1725),

    new Coin(6200, 1725),
    new Coin(6550, 1725),
    new Coin(7500, 1725),
    new Coin(8500, 1725),
    new Coin(9500, 1725),
    new Coin(10500, 1725),
    new Coin(11500, 1725),
    new Coin(12500, 1725),

    new Coin(13950, 1725),
    new Coin(13950, 1750),
    new Coin(13925, 1750),
    new Coin(13975, 1700),
    new Coin(13975, 1725),
    new Coin(13975, 1750),
    new Coin(14000, 1725),
    new Coin(14000, 1750),
    new Coin(14025, 1750),
    
];