// Physics helpers for movement shortcuts
// Gravity applied to player, velocity updates,
// and position integrates with our delta time
const GRAVITY = 1250;

export function applyGravity(player, dt) {
    player.vy += GRAVITY * dt;
}

export function applyFallSpeedUp(player, dt) {
    if (player.vy > 0) {
            player.vy += GRAVITY * 0.5 * dt;
        }
}

export function clampFallSpeed(player) {
    if (player.vy > player.maxFallSpeed) {
        player.vy = player.maxFallSpeed;
    }
}

export function setMovementX(player, direction) {
    player.vx = direction * player.moveSpeed;
}

export function stopMovingX(player) {
    player.vx = 0;
}

export function integrate(player, dt) {
    player.x += player.vx * dt;
    player.y += player.vy * dt;
}