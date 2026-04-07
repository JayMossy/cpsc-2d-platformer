//NOTE This function can be called whenever you want to save the amount of coins collected to the scores object in localStorage. It fires an event to SavedScore.tsx that updates the object in localStorage and rerenders the component.
//We can call this on level completion as well once we implement the boss fight.
export const updatePlayerCoins = (coinsAdded: number) => {
  const scores = JSON.parse(localStorage.getItem("scores") || "[]");
  const playerName = localStorage.getItem("playerName");

  if (!playerName) return;

  const playerScore = scores.find((score: any) => score.name === playerName);
  if (playerScore) {
    playerScore.coinsCollected += coinsAdded;
    localStorage.setItem("scores", JSON.stringify(scores));
    window.dispatchEvent(new CustomEvent("scoresUpdated"));
  }
};
