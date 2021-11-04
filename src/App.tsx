import React from "react";
import "./App.css";
import { GameOfLife } from "./components/GameOfLife";

function App() {
    return (
        <div className="App">
            <h1>Conways Game Of Life</h1>
            <GameOfLife />
        </div>
    );
}

export default App;
