import React from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { GameOfLife } from "./components/GameOfLife";
import { InfoBox } from "./components/InfoBox";
import { NavBar } from "./components/NavBar";
export const mainColor = "#1E3163";
function App() {
    return (
        <div className="App">
            <NavBar />
            <GameOfLife color={mainColor} />
            <InfoBox heading="Conway's Game of Life">
                <p>
                    The Game of Life, also known simply as Life, is a cellular
                    automaton devised by the British mathematician John Horton
                    Conway in 1970. It is a zero-player game, meaning that its
                    evolution is determined by its initial state, requiring no
                    further input. One interacts with the Game of Life by
                    creating an initial configuration and observing how it
                    evolves. It is Turing complete and can simulate a universal
                    constructor or any other Turing machine.
                </p>
            </InfoBox>
            <InfoBox
                heading="Rules"
                items={[
                    "Any live cell with two or three live neighbours survives.",
                    "Any dead cell with three live neighbours becomes a live cell.",
                    "All other live cells die in the next generation. Similarly, all other dead cells stay dead.",
                ]}
            />
            <Footer name="Alwin Mathew" birthYear={2000} />
        </div>
    );
}

export default App;
