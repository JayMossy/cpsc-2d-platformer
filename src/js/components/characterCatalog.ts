import whiteShirtCharacter from "../../assets/sprites/player/main_character/rotations/AIdleeast.png";
import redShirtCharacter from "../../assets/sprites/player/main_character_red_shirt/rotations/east.png";
import greenShirtCharacter from "../../assets/sprites/player/main_character_green_shirt/rotations/east.png";
import { SkinName } from "../systems/skins";

export interface CharacterOption {
  id: number;
  skinName: SkinName;
  label: string;
  source: string;
  shirtColor: string;
  price: number;
  description: string;
}

export const CHARACTER_OPTIONS: CharacterOption[] = [
  {
    id: 1,
    skinName: "whiteShirt",
    label: "White Shirt",
    source: whiteShirtCharacter,
    shirtColor: "#FFFFFF",
    price: 0,
    description: "The default adventurer loadout. Always unlocked.",
  },
  {
    id: 2,
    skinName: "RedShirt",
    label: "Red Shirt",
    source: redShirtCharacter,
    shirtColor: "#FF5A5A",
    price: 15,
    description: "A brighter battle fit for players who want a louder look.",
  },
  {
    id: 3,
    skinName: "greenShirt",
    label: "Green Shirt",
    source: greenShirtCharacter,
    shirtColor: "#33C26B",
    price: 25,
    description:
      "A forest-toned variant for players who want a cleaner palette.",
  },
];

export const getCharacterOption = (
  skinName: SkinName,
): CharacterOption | undefined =>
  CHARACTER_OPTIONS.find((character) => character.skinName === skinName);
