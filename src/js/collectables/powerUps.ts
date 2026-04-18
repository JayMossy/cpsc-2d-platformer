import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";
import { Player } from "../entities/player.js";

const speedUpSpriteSheet: HTMLImageElement = new Image();
speedUpSpriteSheet.src = "";

export const speedUpAnimator: Animator = new Animator(speedUpSpriteSheet, 16, 16);

const jumpUpSpriteSheet: HTMLImageElement = new Image();
jumpUpSpriteSheet.src = "";

export const jumpUpAnimator: Animator = new Animator(jumpUpSpriteSheet, 16, 16);

const strengthUpSpriteSheet: HTMLImageElement = new Image();
jumpUpSpriteSheet.src = "";

export const strengthUpAnimator: Animator = new Animator(strengthUpSpriteSheet, 16, 16);

class SpeedUp extends Collectable {
    constructor(x: number, y: number) {
        super(x, y, 50, 50, speedUpAnimator);
    }

    speedUp(player: Player): void {
        player.moveSpeed = 900;
    }

    speedRevert(player: Player): void {
        player.moveSpeed = 450;
    }
}

class JumpUp extends Collectable {
    constructor(x: number, y: number) {
        super(x, y, 50, 50, jumpUpAnimator);
    }

    jumpUp(player: Player): void {
        player.jump = player.jump * 2;
    }

    jumpRevert(player: Player): void {
        player.jump = player.jump/2;
    }
}

class StrengthUp extends Collectable {
    constructor(x: number, y: number) {
        super(x, y, 50, 50, jumpUpAnimator);
    }

    strengthUp(player: Player): void {
        player.damage = player.jump * 3;
    }

    strengthRevert(player: Player): void {
        player.damage = player.jump/3;
    }
}

export const speedPowerUps = [
    new SpeedUp(300, 1600)
];

export const jumpPowerUps = [
    new JumpUp(600, 1600)
];

export const strengthPowerUps = [
    new StrengthUp(900, 1400)
];
// Thinking of combing all these power ups into one list and also making a base power up class