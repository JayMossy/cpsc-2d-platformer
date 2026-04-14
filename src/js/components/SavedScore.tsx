import React, { useEffect, useState } from 'react'

interface Score {
    name: string,
          highestLevelAchieved: number,
          coinsCollected: number,
}

const SavedScore = () => {
   const [scores, setScores] = useState(() => {
    const stored = localStorage.getItem("scores");
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    
    // Migration: Check if old format (not an array, or array with items containing highScore)
    if (!Array.isArray(parsed) || (Array.isArray(parsed) && parsed.some((item: any) => item.highScore !== undefined))) {
      const playerName = localStorage.getItem("playerName") || "Player";
      const newScores = [
        {
          name: playerName,
          highestLevelAchieved: 0,
          coinsCollected: 0,
        },
      ];
      localStorage.setItem("scores", JSON.stringify(newScores));
      return newScores;
    }
    
    return parsed;
  });

  useEffect(() => {
    const handleScoresUpdate = () => {
      const stored = localStorage.getItem("scores");
      if(stored) {
        let scores = JSON.parse(stored);
        setScores(scores);
      }
    };
    window.addEventListener("scoresUpdated", handleScoresUpdate);
    return () =>
      window.removeEventListener("scoresUpdated", handleScoresUpdate);
  }, []);
  console.log(scores)
    return (
    <>
      <div className="container score-board">
        <div className="">

          <div className="row">
            <h2 className="score-title text-center">High Scores</h2>
          </div>

          {scores.length > 0 ? (
            scores.map((score: Score, index: number) => (
              <div
                key={score.name}
                className="score-item row mb-3 mx-0 p-3 border rounded"
              >
                <div className="col-12 score-name text-warning fw-bold">
                  #{index + 1} {score.name}
                </div>
                <div className="row mt-2">
                  <div className="col-12 col-md-6 score-label">
                    Highest Level Reached:
                  </div>
                  <div className="col-12 col-md-6 score-value text-success">
                    {score.highestLevelAchieved}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-12 score-label">Coins Collected:</div>
                  <div className="col-md-6 col-12 score-value text-primary fw-bold">
                    {score.coinsCollected}
                  </div>
                </div>
                
              </div>
            ))
          ) : (
            <div className="row">
              <div className="col-12 text-center score-empty">
                No scores available yet. Play the game to set a high score!
              </div>
            </div>
          )}

        </div>
      </div>
    </>
    )
}

export default SavedScore;
