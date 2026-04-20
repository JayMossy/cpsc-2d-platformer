import React from "react";
import { Route, Routes } from "react-router";
import MainMenu from "./components/MainMenu";
import LevelOne from "./components/LevelOne";
import CharacterSelect from "./components/CharacterSelect";

const PageController = () => {
	return (
		<Routes>
			<Route path="/" index={true} element={<MainMenu />} />
			<Route path="/level-one" element={<LevelOne />} />
			<Route path="/character-select" element={<CharacterSelect />} />
			<Route path="*" element={<h1>Page Not Found</h1>} />
		</Routes>
	);
}

export default PageController;