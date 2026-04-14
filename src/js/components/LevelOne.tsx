import React, { useEffect, useRef } from "react";
import "../../css/level_one_styles.css"
import DungeonHUD from "./DungeonHUD";
import { startGame } from "../main";

interface LevelOneProps {
  onSendShownComponent: (data: any) => void;
}

function LevelOne({onSendShownComponent}: LevelOneProps) {
  const gameStartedRef = useRef(false);

  useEffect(() => {
    const canvas = document.getElementById("game") as HTMLCanvasElement;

    const handler = () => {
      onSendShownComponent("inBetween");
    };

    window.addEventListener("openInBetweenScreen", handler);

    if (canvas && !gameStartedRef.current) {
      gameStartedRef.current = true;
      startGame(canvas);
    }

    return () => {
      window.removeEventListener("openInBetweenScreen", handler);
    };
  }, []);

  const handleChange = (() => {
    onSendShownComponent("mainMenu")
  })
  return (
    <>
        <div className="game-stage">
          <canvas id="game"></canvas>
          <div className="hud-overlay">
            <DungeonHUD />
          </div>
        </div>
        {/* <button onClick={handleChange}>Back to Menu</button> */}
    </>
  );
}

export default LevelOne;
