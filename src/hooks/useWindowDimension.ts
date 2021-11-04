import { useEffect, useState } from "react";
import { Dimension } from "../types";

const getWindowDimension = (): Dimension => {
    const { innerWidth: w, innerHeight: h } = window;
    return { w, h };
};

const useWindowDimension = (): Dimension => {
    const [windowDimension, setWindowDimension] = useState<Dimension>(
        getWindowDimension()
    );

    useEffect(() => {
        const handleResize = () => {
            setWindowDimension(getWindowDimension());
        };
        window.addEventListener("resize", handleResize);
        return () => {
            //cleanup
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowDimension;
};

export default useWindowDimension;
