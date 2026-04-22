import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import "../../css/ShopPage.css";
import CharacterCard from "./CharacterCard";
import {
  CHARACTER_OPTIONS,
  getCharacterOption,
} from "./characterCatalog";
import {
  getCurrentPlayerScore,
  getOwnedSkins,
  isSkinOwned,
  purchaseSkin,
} from "../systems/scoresManager";

export default function ShopPage() {
  const navigate = useNavigate();
  const [gold, setGold] = useState(() => getCurrentPlayerScore().coinsCollected);
  const [ownedSkins, setOwnedSkins] = useState(() => getOwnedSkins());
  const [selectedId, setSelectedId] = useState<number>(CHARACTER_OPTIONS[0].id);
  const [message, setMessage] = useState<string>("Pick a skin to inspect or unlock it.");
  const [messageTone, setMessageTone] = useState<"info" | "success" | "error">("info");

  const selectedCharacter = useMemo(
    () => CHARACTER_OPTIONS.find((character) => character.id === selectedId) ?? CHARACTER_OPTIONS[0],
    [selectedId],
  );
  const selectedCharacterOwned = isSkinOwned(selectedCharacter.skinName);
  const currentEquipped = localStorage.getItem("chosenCharacter") ?? "whiteShirt";

  const handlePurchase = () => {
    const result = purchaseSkin(selectedCharacter.skinName, selectedCharacter.price);

    if (!result.ok) {
      setMessage(result.error ?? "Purchase failed.");
      setMessageTone("error");
      return;
    }

    setGold(result.remainingCoins ?? getCurrentPlayerScore().coinsCollected);
    setOwnedSkins(getOwnedSkins());
    setMessage(`${selectedCharacter.label} unlocked. You can now equip it.`);
    setMessageTone("success");
  };

  const handleEquip = () => {
    localStorage.setItem("chosenCharacter", selectedCharacter.skinName);
    window.dispatchEvent(
      new CustomEvent("characterChanged", {
        detail: { chosenCharacter: selectedCharacter.skinName },
      }),
    );
    setMessage(`${selectedCharacter.label} equipped.`);
    setMessageTone("success");
  };

  const detailCharacter = getCharacterOption(selectedCharacter.skinName) ?? selectedCharacter;

  return (
    <div className="shop-page">
      <div className="shop-shell">
        <div className="shop-topbar">
          <div>
            <div className="shop-title">SKIN SHOP</div>
            <div className="shop-subtitle">
              Spend collected gold to unlock new looks, then equip them for your next run.
            </div>
          </div>
          <div className="shop-balance">
            <div className="shop-balance__label">AVAILABLE GOLD</div>
            <div className="shop-balance__value">{gold}</div>
          </div>
        </div>

        <div className="shop-layout">
          <div className="shop-grid">
            {CHARACTER_OPTIONS.map((character) => {
              const owned = ownedSkins.includes(character.skinName);
              const equipped = currentEquipped === character.skinName;

              return (
                <CharacterCard
                  key={character.id}
                  character={character}
                  owned={owned}
                  selected={character.id === selectedId}
                  onClick={() => setSelectedId(character.id)}
                  helperText={
                    equipped
                      ? "currently equipped"
                      : owned
                        ? "owned and ready"
                        : `cost: ${character.price} gold`
                  }
                />
              );
            })}
          </div>

          <aside className="shop-details">
            <div className="shop-details__title">{detailCharacter.label}</div>
            <div className="shop-details__description">{detailCharacter.description}</div>
            <div className="shop-details__meta">
              Status: {selectedCharacterOwned ? "Unlocked" : "Locked"}
              <br />
              Cost: {detailCharacter.price === 0 ? "Starter" : `${detailCharacter.price} gold`}
              <br />
              Equipped: {currentEquipped === selectedCharacter.skinName ? "Yes" : "No"}
            </div>

            <div
              className={`shop-message ${messageTone === "success" ? "shop-message--success" : ""} ${messageTone === "error" ? "shop-message--error" : ""}`}
            >
              {message}
            </div>

            <div className="shop-actions">
              <button
                className="shop-btn shop-btn--primary"
                onClick={selectedCharacterOwned ? handleEquip : handlePurchase}
                disabled={!selectedCharacterOwned && gold < selectedCharacter.price}
              >
                {selectedCharacterOwned ? "> EQUIP SKIN" : "> PURCHASE SKIN"}
              </button>
              <button
                className="shop-btn shop-btn--secondary"
                onClick={() => navigate("/character-select")}
              >
                {"> GO TO CHARACTER SELECT"}
              </button>
              <button
                className="shop-btn shop-btn--secondary"
                onClick={() => navigate("/")}
              >
                {"> BACK TO MENU"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
