import React, { useState } from 'react'
import MainMenu from './js/components/MainMenu';
import CharacterSelect from './js/components/CharacterSelect';
import LevelOne from './js/components/LevelOne';
import LevelSelect from './js/components/LevelSelect';
import InBetweenScreen from './js/components/InBetweenScreen';

const App = () => {
    const [shownComponent, setShownComponent] = useState("mainMenu");
    const [overlay, setOverlay] = useState<string | null>(null);

    const handleComponentToShow = (data: string) => {
        console.log(data);
        // If it's the inBetween screen, show as overlay instead
        if (data === "inBetween") {
            setOverlay("inBetween");
        } else {
            setShownComponent(data);
        }
    };

    return (
        <div>
            {/* MAIN SCREENS */}
            {shownComponent === "mainMenu" && (
                <MainMenu onSendShownComponent={handleComponentToShow} />
            )}

            {shownComponent === "levelSelect" && (
                <LevelSelect onSendShownComponent={handleComponentToShow} />
            )}

            {shownComponent === "changeCharacter" && (
                <CharacterSelect onSendShownComponent={handleComponentToShow} />
            )}

            {shownComponent === "levelOne" && (
                <>
                    <LevelOne onSendShownComponent={handleComponentToShow} />

                    {/* OVERLAY ON TOP OF GAME */}
                    {overlay === "inBetween" && (
                        <InBetweenScreen
                            onEnterBoss={() => {
                                window.dispatchEvent(new Event("enterBoss"));
                                setOverlay(null);
                            }}
                            onBackToPortal={() => {
                                window.dispatchEvent(new Event("movePlayerBack"));
                                setOverlay(null);
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default App;