import React from "react";

interface InfoBoxProps {
    heading?: string;
    items?: string[];
    body?: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({
    heading,
    items,
    body,
    children,
}) => {
    return (
        <div
            className="info-box"
            style={{
                width: "92vw",
                margin: "15px auto 15px auto",
            }}
        >
            <h3 style={{ padding: "0px 0px 10px 0px" }}>{heading}</h3>
            {children}
            {body}
            {items &&
                items.map((item, index) => (
                    <p key={index + 1} style={{ margin: "5px 5px" }}>
                        {index + 1} {item}
                    </p>
                ))}
        </div>
    );
};
