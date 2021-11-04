import React from "react";

interface FooterProps {
    name: string;
    birthYear: number;
}
export const Footer: React.FC<FooterProps> = ({ name, birthYear }) => {
    return (
        <div
            style={{
                color: "white",
                backgroundColor: "#1E3163",
                padding: 20,
            }}
        >
            <p>
                {name}, {birthYear}-{new Date().getFullYear()}
            </p>
        </div>
    );
};
