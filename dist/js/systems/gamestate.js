let currentState = "playing";
export function getState() {
    return currentState;
}
export function setState(newState) {
    currentState = newState;
}
