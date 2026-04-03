import React from "react";
import { createRoot, Root } from "react-dom/client";
import App from "./App";

//NOTE Original
// (function start() {
// 	const topElement = <>
// 		<img className="img-fluid" src="images/road_to_adventure.png" />
// 		<PartyList party={[...characters]} />
// 	</>
// 	const root = createRoot(document.getElementById("main")!); // non-null assertion operator (!)
// 	root.render(topElement);
// })();

const root: Root = createRoot(document.getElementById("main")!);
root.render(<App />)