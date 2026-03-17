// @ts-nocheck

function FirstTimePlaying() {
  const modalRef = React.useRef(null);
  const [playerName, setPlayerName] = React.useState("");
  const boilerPlateScore = {
    name: "",
    highestLevelAchieved: 0,
    highScore: 0
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (playerName.trim()) {
      localStorage.setItem("playerName", playerName.trim());
      if (!localStorage.getItem("scores")) {
        let scores = [{
          name: playerName.trim(),
          highestLevelAchieved: 0,
          highScore: 0
        }];
        localStorage.setItem("scores", JSON.stringify(scores));
      } else {
        let scores = JSON.parse(localStorage.getItem("scores"));
        boilerPlateScore.name = playerName.trim();
        scores.push(boilerPlateScore);
        localStorage.setItem("scores", JSON.stringify(scores));
      }
      // Close modal
      const modal = bootstrap.Modal.getInstance(modalRef.current);
      modal.hide(); // Notify SavedScore to update
      window.dispatchEvent(new CustomEvent('scoresUpdated', {
        detail: {
          playerName: playerName.trim()
        }
      }));
    }
  };
  React.useEffect(() => {
    if (!localStorage.getItem("hasPlayed")) {
      // Show the modal for first-time players
      const modal = new bootstrap.Modal(modalRef.current);
      modal.show();
      // Mark as played
      localStorage.setItem("hasPlayed", "true");
    }
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "modal fade",
    id: "firstTimeModal",
    ref: modalRef,
    tabIndex: "-1",
    "aria-labelledby": "firstTimeModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog modal-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    style: {
      backgroundColor: "rgba(10, 10, 15, 0.95)",
      border: "2px solid rgba(255, 255, 255, 0.2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "modal-title text-white",
    id: "firstTimeModalLabel"
  }, "Welcome to the Game!")), /*#__PURE__*/React.createElement("div", {
    className: "modal-body text-white"
  }, /*#__PURE__*/React.createElement("p", null, "Welcome to our 2D Platformer! Here's a quick guide:"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Use arrow keys to move and jump."), /*#__PURE__*/React.createElement("li", null, "Collect coins and avoid enemies."), /*#__PURE__*/React.createElement("li", null, "Reach the highest level possible!")), /*#__PURE__*/React.createElement("p", null, "Have fun playing!"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "playerName",
    className: "form-label text-white"
  }, "Enter your name:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control bg-dark",
    id: "playerName",
    value: playerName,
    onChange: e => setPlayerName(e.target.value),
    required: true,
    style: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      border: "1px solid rgba(255, 255, 255, 0.3)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Let's Play!")))))));
}
(function start() {
  const renderTo = id => {
    const container = document.getElementById(id);
    if (!container) return null;

    // Avoid creating multiple roots on the same container
    if (!container.__firstTimeRoot) {
      container.__firstTimeRoot = ReactDOM.createRoot(container);
    }
    container.__firstTimeRoot.render(React.createElement(FirstTimePlaying, null));
    return container.__firstTimeRoot;
  };

  // Render to a hidden div or wherever you want the modal to be available
  renderTo("first-time-inject");
})();
