import React from "react";
import { CharacterOption } from "./characterCatalog";
import "../../css/CharacterCard.css";

interface CharacterCardProps {
  character: CharacterOption;
  owned: boolean;
  selected: boolean;
  onClick: () => void;
  helperText: string;
  disabled?: boolean;
}

function CharacterCard({
  character,
  owned,
  selected,
  onClick,
  helperText,
  disabled = false,
}: CharacterCardProps) {
  const statusLabel = character.price === 0 ? "starter" : owned ? "owned" : `${character.price} gold`;

  return (
    <button
      type="button"
      className={`character-card ${selected ? "character-card--selected" : ""} ${!owned ? "character-card--locked" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="character-card__status-row">
        <span className="character-card__status">{statusLabel}</span>
      </div>
      <img
        src={character.source}
        alt={character.label}
        className="character-card__portrait"
      />
      <div className="character-card__name">{character.label}</div>
      <div
        className="character-card__color"
        style={{ color: character.shirtColor }}
      >
        ■ shirt
      </div>
      <div className="character-card__helper">{helperText}</div>
    </button>
  );
}

export default CharacterCard;