import { SkinName } from "./skins";

interface Score {
  name: string;
  highestLevelAchieved: number;
  coinsCollected: number;
}

interface LevelResult {
  coinsCollected: number;
  highestLevelAchieved: number;
}

const SCORES_KEY = "scores";

const getCurrentPlayerName = (): string =>
  localStorage.getItem("playerName") || "Player";

const getOwnedSkinsStorageKey = (playerName: string): string =>
  `ownedSkins:${playerName}`;

const normalizeOwnedSkins = (
  ownedSkins: SkinName[] | undefined,
): SkinName[] => {
  const chosenCharacter = localStorage.getItem(
    "chosenCharacter",
  ) as SkinName | null;
  const normalized = new Set<SkinName>(["whiteShirt"]);

  for (const skin of ownedSkins ?? []) {
    normalized.add(skin);
  }

  if (chosenCharacter) {
    normalized.add(chosenCharacter);
  }

  return Array.from(normalized);
};

const getOrCreateScores = (): Score[] => {
  const raw = localStorage.getItem(SCORES_KEY);
  if (!raw) return [];

  const parsed = JSON.parse(raw) as unknown;
  return Array.isArray(parsed) ? (parsed as Score[]) : [];
};

const persistScores = (scores: Score[]): void => {
  localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
};

const persistOwnedSkins = (ownedSkins: SkinName[]): void => {
  localStorage.setItem(
    getOwnedSkinsStorageKey(getCurrentPlayerName()),
    JSON.stringify(normalizeOwnedSkins(ownedSkins)),
  );
};

const emitScoreUpdated = () => {
  window.dispatchEvent(new CustomEvent("scoresUpdated"));
};

export const getCurrentPlayerScore = (): Score => {
  const playerName = getCurrentPlayerName();
  const existing = getOrCreateScores().find(
    (score) => score.name === playerName,
  );

  return (
    existing ?? {
      name: playerName,
      highestLevelAchieved: 0,
      coinsCollected: 0,
    }
  );
};

export const getOwnedSkins = (): SkinName[] => {
  const stored = localStorage.getItem(
    getOwnedSkinsStorageKey(getCurrentPlayerName()),
  );

  if (!stored) {
    const fallback = normalizeOwnedSkins(undefined);
    persistOwnedSkins(fallback);
    return fallback;
  }

  const parsed = JSON.parse(stored) as unknown;
  const ownedSkins = Array.isArray(parsed) ? (parsed as SkinName[]) : undefined;
  const normalized = normalizeOwnedSkins(ownedSkins);

  persistOwnedSkins(normalized);
  return normalized;
};

export const isSkinOwned = (skinName: SkinName): boolean =>
  getOwnedSkins().includes(skinName);

export const purchaseSkin = (
  skinName: SkinName,
  price: number,
): { ok: boolean; error?: string; remainingCoins?: number } => {
  if (isSkinOwned(skinName)) {
    return {
      ok: true,
      remainingCoins: getCurrentPlayerScore().coinsCollected,
    };
  }

  const playerScore = getCurrentPlayerScore();

  if (playerScore.coinsCollected < price) {
    return {
      ok: false,
      error: `Need ${price - playerScore.coinsCollected} more gold to unlock this skin.`,
    };
  }

  const scores = getOrCreateScores();
  const existing = scores.find((score) => score.name === playerScore.name);

  if (existing) {
    existing.coinsCollected -= price;
  } else {
    scores.push({
      ...playerScore,
      coinsCollected: Math.max(playerScore.coinsCollected - price, 0),
    });
  }

  persistScores(scores);
  persistOwnedSkins([...getOwnedSkins(), skinName]);
  emitScoreUpdated();

  return {
    ok: true,
    remainingCoins: getCurrentPlayerScore().coinsCollected,
  };
};

export const saveLevelResult = ({
  coinsCollected,
  highestLevelAchieved,
}: LevelResult): void => {
  const playerName = getCurrentPlayerName();

  const scores = getOrCreateScores();
  const existing = scores.find((score) => score.name === playerName);

  if (existing) {
    existing.coinsCollected += coinsCollected;
    existing.highestLevelAchieved = Math.max(
      existing.highestLevelAchieved,
      highestLevelAchieved,
    );
  } else {
    scores.push({
      name: playerName,
      highestLevelAchieved,
      coinsCollected,
    });
  }

  persistScores(scores);
  emitScoreUpdated();
};

export const updatePlayerCoins = (coinsAdded: number): void => {
  saveLevelResult({
    coinsCollected: coinsAdded,
    highestLevelAchieved: 0,
  });
};
