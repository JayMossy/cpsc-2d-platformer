import { keys } from "../systems/userInput.js";
import { LevelOneMap } from "./levelOneMapRender.js";
import { BossArena } from "./bossArenaRender.js";

const levelOne = new LevelOneMap();
const bossArena = new BossArena();

const levels = [levelOne, bossArena]

let canSwitch = true;
let currentLevel = 0;

function moveMaps() {
    if (keys.e && canSwitch && levels[currentLevel].canSwitch) {
        canSwitch = false;
        currentLevel = (currentLevel + 1) % levels.length;
        if (currentLevel === 0) levelOne.setPlayerPos(2000, 1750);
        if (currentLevel === 1) bossArena.setPlayerPos(540, 1605);
    }

    if (!keys.e) {
        canSwitch = true;
    }
}

export function getCurrentLevel() {
    return currentLevel;
}

export function render() {
    moveMaps();
    
    levels[currentLevel].render();
}