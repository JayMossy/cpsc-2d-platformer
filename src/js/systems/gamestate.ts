export type GameState = "playing" | "intermission" | "boss";

let currentState: GameState = "playing";

export function getState(): GameState {
    return currentState;
}

export function setState(newState: GameState): void {
    currentState = newState;
}