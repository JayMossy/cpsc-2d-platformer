import { Animator } from "./animator";
import { SKINS, SkinName } from "./skins";

let currentSkin =
    SKINS[(localStorage.getItem("chosenCharacter") as SkinName) ?? "whiteShirt"];

function buildAnimators(skin: typeof SKINS[SkinName]) {
    const unarmedIdleRunImg = new Image();
    unarmedIdleRunImg.src = skin.unarmed.sprites.idleRun;

    const unarmedJumpImg = new Image();
    unarmedJumpImg.src = skin.unarmed.sprites.jump;

    const unarmedIdleRun = new Animator(unarmedIdleRunImg, 48, 43);
    const unarmedJump = new Animator(unarmedJumpImg, 48, 43);

    for (const [name, frames] of Object.entries(skin.unarmed.animations.idleRun)) {
        unarmedIdleRun.addAnimation(name, frames);
    }

    for (const [name, frames] of Object.entries(skin.unarmed.animations.jump)) {
        unarmedJump.addAnimation(name, frames);
    }

    const swordIdleRunImg = new Image();
    swordIdleRunImg.src = skin.sword.sprites.idleRun;

    const swordJumpImg = new Image();
    swordJumpImg.src = skin.sword.sprites.jump;

    const swordIdleRun = new Animator(swordIdleRunImg, 48, 43);
    const swordJump = new Animator(swordJumpImg, 48, 43);

    for (const [name, frames] of Object.entries(skin.sword.animations.idleRun)) {
        swordIdleRun.addAnimation(name, frames);
    }

    for (const [name, frames] of Object.entries(skin.sword.animations.jump)) {
        swordJump.addAnimation(name, frames);
    }

    let swordAttack = swordIdleRun;

    if (skin.sword.sprites.attack) {
        const swordAttackImg = new Image();
        swordAttackImg.src = skin.sword.sprites.attack;

        swordAttack = new Animator(swordAttackImg, 48, 43);

        const attackAnimations = skin.sword.animations.attack ?? {};

        for (const [name, frames] of Object.entries(attackAnimations)) {
            swordAttack.addAnimation(name, frames);
        }
    }

    return {
        unarmed: {
            idleRun: unarmedIdleRun,
            jump: unarmedJump
        },
        sword: {
            idleRun: swordIdleRun,
            jump: swordJump,
            attack: swordAttack
        }
    };
}

export let animators = buildAnimators(currentSkin);

export function applySelectedCharacter() {
    const chosen =
        (localStorage.getItem("chosenCharacter") as SkinName) ?? "whiteShirt";

    const newSkin = SKINS[chosen];

    if (newSkin === currentSkin) return;

    currentSkin = newSkin;

    animators = buildAnimators(currentSkin);
}

window.addEventListener("characterChanged", applySelectedCharacter);