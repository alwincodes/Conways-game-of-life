import React from "react";
import "./App.css";
import { GameOfLife } from "./components/GameOfLife";
import { NavBar } from "./components/NavBar";
export const mainColor = "#1E3163";
function App() {
    return (
        <div className="App">
            <NavBar />
            <GameOfLife color={mainColor} />
        </div>
    );
}

export default App;
