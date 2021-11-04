import produce from "immer";
import React, { useEffect, useState, useRef, useCallback } from "react";
import useWindowDimension from "../hooks/useWindowDimension";
import { Dimension } from "../types";

interface GameOfLifeProps {
    color?: string;
}

const generateArrayMatrix = (size: Dimension, empty?: boolean): number[][] => {
    let { w: j, h: i } = size;
    i /= 30;
    j /= 28;
    let resArr: number[][] = [];
    for (let ii = 0; ii < i; ii++) {
        resArr[ii] = [];
        for (let jj = 0; jj < j; jj++) {
            resArr[ii][jj] = empty ? 0 : Math.round(Math.random());
        }
    }
    return resArr;
};

//styles
const gameOfLifeStyle = {
    margin: "10px auto",
    width: "fit-content",
};
const buttonBaseStyle = {
    borderRadius: 10,
    padding: 10,
    color: "white",
    backgroundColor: "#1E3163",
    margin: 5,
};

const compareArr = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    // [0, 0], dont compare the item with itself
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];
export const GameOfLife: React.FC<GameOfLifeProps> = ({
    color = "turquoise",
    children: _children,
}) => {
    const dimension = useWindowDimension(); //custom hook that calculates dimensions in real-time
    //when dimension changes create new array to fit screen
    const [arr, setArr] = useState<number[][]>(
        generateArrayMatrix(dimension, true)
    );

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        setSim((sim) => (sim = false));
        setArr(generateArrayMatrix(dimension, true));
    }, [dimension]);

    //to start the simulation
    const [sim, setSim] = useState<boolean>(false);
    const isSimRunning = useRef(sim);
    isSimRunning.current = sim;
    const simCount = useRef(0);
    const aliveCount = useRef(0);

    const simulation = useCallback(() => {
        //used Memoization due to function being huge to remake every render
        if (!isSimRunning.current) return;
        //compare every element with the neighbours and change state every 200ms
        //using immer library to make the process easy
        simCount.current += 1;
        aliveCount.current = 0;
        setArr((arr) =>
            produce(arr, (draft) => {
                const a1Len = arr.length;
                const a2Len = arr[0].length;
                for (let i = 0; i < a1Len; i++) {
                    for (let j = 0; j < a2Len; j++) {
                        //getting the nested array length
                        //calculating all the other index
                        let totalSum = 0;
                        aliveCount.current += arr[i][j];
                        for (let k = 0; k < compareArr.length; k++) {
                            let [a, b] = compareArr[k];
                            a += i;
                            b += j;
                            if (a >= 0 && a < a1Len && b >= 0 && b < a2Len) {
                                totalSum += arr[a][b];
                            }
                        }
                        /*
                        Any live cell with two or three live neighbours survives.
                        Any dead cell with three live neighbours becomes a live cell.
                        All other live cells die in the next generation. Similarly, all other dead cells stay dead.
                        */
                        let currentVal = arr[i][j];
                        if (
                            currentVal === 1 &&
                            totalSum >= 2 &&
                            totalSum <= 3
                        ) {
                            draft[i][j] = 1;
                        } else if (currentVal === 0 && totalSum === 3) {
                            draft[i][j] = 1;
                        } else {
                            draft[i][j] = 0;
                        }
                    }
                }
            })
        );
        setTimeout(simulation, 100);
    }, []);

    const handleClick = (
        e: React.MouseEvent<HTMLDivElement>,
        i: number,
        j: number
    ) => {
        setArr((arr) =>
            produce(arr, (draft) => {
                draft[i][j] = draft[i][j] ? 0 : 1; // 1 is truthy and 0 is falsy ie if pos = 1 then = of if pos = 0 then 1
            })
        );
    };

    return (
        <div className="gameOfLife" style={gameOfLifeStyle}>
            <div className="buttons" style={{ margin: "5px 2px" }}>
                <button
                    style={{ ...buttonBaseStyle }}
                    onClick={() => {
                        simCount.current = 0;
                        aliveCount.current = 0;
                        setArr(generateArrayMatrix(dimension, false));
                    }}
                >
                    Generate Random Seed
                </button>
                <button
                    style={{ ...buttonBaseStyle }}
                    onClick={() => {
                        setSim((s) => !s);
                        if (!sim) {
                            isSimRunning.current = true;
                            simulation();
                        }
                    }}
                >
                    {sim ? "stop simulation" : "start simulation"}
                </button>
                <button
                    style={{ ...buttonBaseStyle, backgroundColor: "#FC5404" }}
                    onClick={() => {
                        simCount.current = 0;
                        aliveCount.current = 0;
                        setSim((sim) => (sim = false));
                        setArr(generateArrayMatrix(dimension, true));
                    }}
                >
                    reset
                </button>
            </div>
            {/* render the array as a 2x2 matrix */}
            {arr.map((a, i) => {
                return (
                    <div
                        key={i}
                        style={{ display: "block", padding: "2px 7px" }}
                    >
                        {a.map((d, j) => {
                            return (
                                <div
                                    key={j}
                                    style={{
                                        cursor: "pointer",
                                        padding: "2px 7px",
                                        display: "inline",
                                        border: "1px solid black",
                                        color: d === 1 ? "white" : "black",
                                        backgroundColor:
                                            d === 1 ? color : "white",
                                    }}
                                    onClick={(e) => handleClick(e, i, j)}
                                >
                                    {d}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
            <p style={{ margin: "4px 5px", fontWeight: "bolder" }}>
                Generation count: {simCount.current}, alive count:{" "}
                {aliveCount.current}
            </p>
        </div>
    );
};
