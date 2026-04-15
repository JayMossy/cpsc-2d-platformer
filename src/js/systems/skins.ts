export type SkinName = "whiteShirt" | "RedShirt";
export type Mode = "unarmed" | "sword";

export interface ModeData {
    sprites: {
        idleRun: string;
        jump: string;
        attack?: string;
    };

    animations: {
        idleRun: Record<string, number[]>;
        jump: Record<string, number[]>;
        attack?: Record<string, number[]>;
    };
}

export interface Skin {
    unarmed: ModeData;
    sword: ModeData;
}

export const SKINS: Record<SkinName, Skin> = {
    whiteShirt: {
        unarmed: {
            sprites: {
                idleRun:
                    "/assets/sprites/player/main_character/SpriteSheet/spritesheetmcwalkrun.png",
                jump: "/assets/sprites/player/Jump/WhiteJumpNoSword.png"
            },

            animations: {
                idleRun: {
                    "idle right": [0],
                    "idle left": [1],
                    "run right": [2, 3, 4, 5],
                    "run left": [6, 7, 8, 9]
                },

                jump: {
                    "jump up right": [0, 1, 2, 3],
                    "jump up left": [4, 5, 6, 7],
                    "fall right": [3, 2, 1, 0],
                    "fall left": [7, 6, 5, 4]
                }
            }
        },

        sword: {
            sprites: {
                idleRun: "/assets/sprites/player/Sword_White_Shirt/SpriteSwordRunIdle.png",
                jump: "/assets/sprites/player/Jump/WhiteJumpWithSword.png",
                attack: "/assets/sprites/player/Swings/WhiteSwings.png"
            },

            animations: {
                idleRun: {
                    "idle right": [0],
                    "idle left": [1],
                    "run right": [2, 3, 4, 5],
                    "run left": [6, 7, 8, 9]
                },

                jump: {
                    "jump up right": [0, 1, 2, 3],
                    "jump up left": [4, 5, 6, 7],
                    "fall right": [3, 2, 1, 0],
                    "fall left": [7, 6, 5, 4]
                },

                attack: {
                    "attack right": [0, 1, 2, 3, 4, 5],
                    "attack left": [6, 7, 8, 9, 10, 11]
                }
            }
        }
    },

    RedShirt: {
        unarmed: {
            sprites: {
                idleRun:
                    "/assets/sprites/player/main_character_red_shirt/SpriteSheet/spritesheetmcrwalkrun.png",
                jump: "/assets/sprites/player/Jump/RedJumpNoSword.png"
            },

            animations: {
                idleRun: {
                    "idle right": [0],
                    "idle left": [1],
                    "run right": [2, 3, 4, 5],
                    "run left": [6, 7, 8, 9]
                },

                jump: {
                    "jump up right": [0, 1, 2, 3],
                    "jump up left": [4, 5, 6, 7],
                    "fall right": [3, 2, 1, 0],
                    "fall left": [7, 6, 5, 4]
                }
            }
        },

        sword: {
            sprites: {
                idleRun: "/assets/sprites/player/Sword_Red_Shirt/SpriteSwordRedRunIdle.png",
                jump: "/assets/sprites/player/jump/RedJumpWithSword.png",
                attack:"/assets/sprites/player/Swings/RedSwings.png"
            },

            animations: {
                idleRun: {
                    "idle right": [0],
                    "idle left": [1],
                    "run right": [2, 3, 4, 5],
                    "run left": [6, 7, 8, 9]
                },

                jump: {
                    "jump up right": [0, 1, 2, 3],
                    "jump up left": [4, 5, 6, 7],
                    "fall right": [3, 2, 1, 0],
                    "fall left": [7, 6, 5, 4]
                },

                attack: {
                    "attack right": [0, 1, 2, 3, 4, 5],
                    "attack left": [6, 7, 8, 9, 10, 11]
                }
            }
        }
    }
};