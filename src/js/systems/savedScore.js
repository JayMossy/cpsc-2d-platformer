// @ts-nocheck
function SavedScore() {
  function getScores() {
    //NOTE scores object will look like this, we can add more later if needed.
    const scores = [{
      name: "Evan",
      highestLevelAchieved: 2,
      highScore: 13
    }, {
      name: "John",
      highestLevelAchieved: 3,
      highScore: 19
    }];
    // const jsonScores = localStorage.getItem("scores")
    // const scores = JSON.parse(jsonScores)
    return scores;
  }
  const scores = getScores();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "container score-board"
  }, /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "score-title text-center"
  }, "High Scores")), scores.length > 0 ? scores.map((score, index) => /*#__PURE__*/React.createElement("div", {
    key: score.name,
    className: "score-item row mb-3 p-3 border rounded"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12 score-name text-warning fw-bold"
  }, "#", index + 1, " ", score.name), /*#__PURE__*/React.createElement("div", {
    className: "row mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-md-6 score-label"
  }, "Highest Level Reached:"), /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-md-6 score-value text-success"
  }, score.highestLevelAchieved)), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 col-12 score-label"
  }, "High Score:"), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 col-12 score-value text-primary fw-bold"
  }, score.highScore)))) : /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12 text-center text-muted score-empty"
  }, "No scores available yet. Play the game to set a high score!")))));
}
(function start() {
  const renderTo = id => {
    const container = document.getElementById(id);
    if (!container) return null;

    // Avoid creating multiple roots on the same container
    if (!container.__savedScoreRoot) {
      container.__savedScoreRoot = ReactDOM.createRoot(container);
    }
    container.__savedScoreRoot.render(/*#__PURE__*/React.createElement(SavedScore, null));
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
