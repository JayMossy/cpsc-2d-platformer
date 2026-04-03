import React, { useState } from 'react'
import MainMenu from './js/components/MainMenu';


const App = () => {
    //NOTE I am thinking that this state should be what is used to determine which compoenent to show. i.e when start game in Main Menu is clicked, send a notification to this file and render the game instead of the MainMenu.
    const [shownComponent, setShownComponent] = useState("mainMenu")

    const handleComponentToShow = (data: string) => {
    setShownComponent(data);
    console.log(data)
  };
    return (
        <>
            <div>
                {shownComponent == "mainMenu" &&
                <MainMenu onSendShownComponent = {handleComponentToShow}/>
                }
                {shownComponent == "changeCharacter" &&
                <h1>Change Character</h1>
                }
            </div>
        </>
    )
}

export default App;
