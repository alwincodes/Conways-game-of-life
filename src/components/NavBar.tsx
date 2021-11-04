import React from "react";

interface NavBarProps {}
const alwinPortFolio = "https://alwincodes-portfolio.netlify.app/";
const alwinGitHub = "https://github.com/alwincodes";
const gameOfLifeWiki = "";
const navStyles = {
    display: "flex",
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "#1E3163",
    color: "white",
    textDecoration: "none",
};

const linkStyles = {
    color: "inherit",
    cursor: "pointer",
    display: "inline-block",
    margin: "5px 10px",
};
export const NavBar: React.FC<NavBarProps> = ({ children: _children }) => {
    return (
        <div className="navbar" style={{ ...navStyles }}>
            <div className="nv1">
                <a className="link" href={gameOfLifeWiki} style={linkStyles}>
                    <h2>Conway's Game Of Life</h2>
                </a>
            </div>
            <div>
                <a
                    href={alwinPortFolio}
                    style={{ ...linkStyles }}
                    className="link"
                >
                    My_Portfolio
                </a>
                <a
                    className="link"
                    href={alwinGitHub}
                    style={{ ...linkStyles }}
                >
                    GitHub
                </a>
            </div>
        </div>
    );
};
