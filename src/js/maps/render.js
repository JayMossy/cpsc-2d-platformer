import { LevelOneMap } from "./levelOneMapRender.js";
import { BossArena } from "./bossArenaRender.js";
import { getState } from "../systems/gamestate.js";

const levelOne = new LevelOneMap();
export const bossArena = new BossArena();

export function render() {
    const state = getState();

    if (state === "playing") {
        levelOne.render();
    }
    else if (state === "intermission") {
        // Still render level one in background
        levelOne.render();
    }
    else if (state === "boss") {
        bossArena.render();
    }
}
