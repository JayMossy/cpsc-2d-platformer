import React from "react";
import lockImg from "../../assets/sprites/ui/locked.png";

type Props = {
    onSendShownComponent: (component: string) => void;
};

const levels = [
    { id: 1, unlocked: true },
    { id: 2, unlocked: false },
    { id: 3, unlocked: false },
];

const LevelSelect: React.FC<Props> = ({ onSendShownComponent }) => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Select Level</h1>

            <div style={styles.grid}>
                {levels.map((level) => (
                    <div
                        key={level.id}
                        style={{
                            ...styles.levelBox,
                            backgroundColor: level.unlocked ? "#4caf50" : "#555",
                            cursor: level.unlocked ? "pointer" : "not-allowed",
                        }}
                        onClick={() => {
                            if (!level.unlocked) return;

                            if (level.id === 1) {
                                onSendShownComponent("levelOne");
                            }

                            // later: levelTwo, etc.
                        }}
                    >
                        <span style={styles.text}>Level {level.id}</span>

                        {!level.unlocked && (
                            <img
                                src={lockImg}
                                style={styles.lock}
                            />
                        )}
                    </div>
                ))}
            </div>

            <button
                style={styles.backBtn}
                onClick={() => onSendShownComponent("mainMenu")}
            >
                Back
            </button>
        </div>
    );
};

const styles: any = {
    container: {
        height: "100vh",
        background: "linear-gradient(#1e1e2f, #2c3e50)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    },
    title: {
        marginBottom: "40px",
    },
    grid: {
        display: "flex",
        gap: "30px",
    },
    levelBox: {
        width: "120px",
        height: "120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        position: "relative",
        fontSize: "18px",
        fontWeight: "bold",
    },
    text: {},
    lock: {
        position: "absolute",
        width: "40px",
        height: "40px",
        bottom: "10px",
        right: "10px",
        opacity: 0.9,
    },
    backBtn: {
        marginTop: "40px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
    },
};

export default LevelSelect;