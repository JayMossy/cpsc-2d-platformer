import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";
import { Player } from "../entities/player.js";
import playSound from "../systems/soundsManager";

const speedUpSpriteSheet: HTMLImageElement = new Image();
speedUpSpriteSheet.src = "/assets/sprites/collectibles/speedUp_sprite_sheet.png";

const jumpUpSpriteSheet: HTMLImageElement = new Image();
jumpUpSpriteSheet.src = "/assets/sprites/collectibles/jumpUp_sprite_sheet.png";

const strengthUpSpriteSheet: HTMLImageElement = new Image();
strengthUpSpriteSheet.src = "/assets/sprites/collectibles/strengthUp_sprite_sheet.png";;

export const speedUpAnimator: Animator = new Animator(speedUpSpriteSheet, 189, 176);
speedUpAnimator.addAnimation("move", [1, 2, 3, 2]);
speedUpAnimator.setAnimation("move");

export const jumpUpAnimator: Animator = new Animator(jumpUpSpriteSheet, 1050/3, 237); //TODO: fix x,y in canva
jumpUpAnimator.addAnimation("bounce", [0, 1, 2, 1]);
jumpUpAnimator.setAnimation("bounce");

export const strengthUpAnimator: Animator = new Animator(strengthUpSpriteSheet, 978/4, 255);
strengthUpAnimator.addAnimation("surge", [0, 1, 2, 3, 2, 1]);
strengthUpAnimator.setAnimation("surge");

abstract class PowerUp extends Collectable {
    constructor(x: number, y: number, animator: Animator) {
        super(x, y, 55, 55, animator);
    }

    playSound(): void {
        playSound("powerUp");
    }

    abstract powerUp(player: Player): void;

    abstract powerRevert(player: Player): void
}

class SpeedUp extends PowerUp {
    constructor(x: number, y: number) {
        super(x, y, speedUpAnimator);
    }

    powerUp(player: Player): void {
        player.moveSpeed = 650;
        console.log("Speed Up");
    }

    powerRevert(player: Player): void {
        player.moveSpeed = 450;
        console.log("Speed Reverted");
    }
}

class JumpUp extends PowerUp {
    constructor(x: number, y: number) {
        super(x, y, jumpUpAnimator);
    }

    powerUp(player: Player): void {
        player.jump += 300;
        console.log("Jump Up");
    }

    powerRevert(player: Player): void {
        player.jump -= 300;
        console.log("Jump Reverted");
    }
}

class StrengthUp extends PowerUp {
    constructor(x: number, y: number) {
        super(x, y, strengthUpAnimator);
    }

    powerUp(player: Player): void {
        player.damage = 2;
        console.log("Strength Up");
    }

    powerRevert(player: Player): void {
        player.damage = 1;
        console.log("Strength Reverted");
    }
}


export const powerUps: PowerUp[] = [
    new SpeedUp(1575+150, 1400),
    new JumpUp(3730+150, 1300),
    new StrengthUp(8000, 1700)
];