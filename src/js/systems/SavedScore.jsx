// @ts-nocheck
function SavedScore() {
  const [scores, setScores] = React.useState(() => {
    const stored = localStorage.getItem("scores");
    return stored ? JSON.parse(stored) : [];
  });

  React.useEffect(() => {
    const handleScoresUpdate = () => {
      const stored = localStorage.getItem("scores");
      setScores(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener("scoresUpdated", handleScoresUpdate);
    return () =>
      window.removeEventListener("scoresUpdated", handleScoresUpdate);
  }, []);

  //   function getScores() {
  //     //NOTE scores object will look like this, we can add more to this later if needed.
  //     const scores = [
  //       {
  //         name: "Evan",
  //         highestLevelAchieved: 2,
  //         highScore: 13,
  //       },
  //       {
  //         name: "John",
  //         highestLevelAchieved: 3,
  //         highScore: 19,
  //       },
  //     ];
  //     // const jsonScores = localStorage.getItem("scores")
  //     // const scores = JSON.parse(jsonScores)
  //     return scores;
  //   }
  return (
    <>
      <div className="container score-board">
        <div className="">
          <div className="row">
            <h2 className="score-title text-center">High Scores</h2>
          </div>
          {scores.length > 0 ? (
            scores.map((score, index) => (
              <div
                key={score.name}
                className="score-item row mb-3 p-3 border rounded"
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
                  <div className="col-md-6 col-12 score-label">High Score:</div>
                  <div className="col-md-6 col-12 score-value text-primary fw-bold">
                    {score.highScore}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="row">
              <div className="col-12 text-center text-muted score-empty">
                No scores available yet. Play the game to set a high score!
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

(function start() {
  const renderTo = (id) => {
    const container = document.getElementById(id);
    if (!container) return null;

    // Avoid creating multiple roots on the same container
    if (!container.__savedScoreRoot) {
      container.__savedScoreRoot = ReactDOM.createRoot(container);
    }

    container.__savedScoreRoot.render(<SavedScore />);
    return container.__savedScoreRoot;
  };

  // Desktop/tablet: show scoreboard in column
  renderTo("saved_score_inject");

  // Mobile: re-render every time the modal opens (Bootstrap is controlling visibility)
  const modal = document.getElementById("scoresModal");
  if (modal) {
    modal.addEventListener("shown.bs.modal", () => {
      renderTo("saved_score_modal_inject");
    });
  }
})();
