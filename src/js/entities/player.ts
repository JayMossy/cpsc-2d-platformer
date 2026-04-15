export interface Player {
        x: number;
        y: number;
        spawnX: number;
        spawnY: number;
        w: number;
        h: number;
        vx: number;
        vy: number;
        moveSpeed: number;
        jump: number;
        maxFallSpeed: number;
        grounded: boolean;
        lastDir: FacingDirection;
        collectedCoins: number;
        health: number;
        maxHealth: number;
        damage: number;
        attackCooldown: number;
        attackTimer: number;
        invulnTime: number;
        invulnTimer: number;
        isDead: boolean;
        knockbackX: number;
        knockbackY: number;
        mode: "unarmed" | "sword";
}

export type FacingDirection = "left" | "right";

export function createPlayer(x: number, y: number): Player {
    return {
        x,
        y,
        spawnX: x,
        spawnY: y,
        w: 60,
        h: 60,
        vx: 0,
        vy: 0,
        moveSpeed: 450,
        jump: 800,
        maxFallSpeed: 1400,
        grounded: false,
        lastDir: "right",
        collectedCoins: 0,
        health: 3,
        maxHealth: 5,
        damage: 1,
        attackCooldown: .25,
        attackTimer: 0,
        invulnTime: 2,
        invulnTimer: 0,
        isDead: false,
        knockbackX: 0,
        knockbackY: 0,
        mode: "unarmed"
    };
}

export const player: Player = createPlayer(200, 1500);