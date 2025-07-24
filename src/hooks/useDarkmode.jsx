import { useState, useEffect } from "react";

export function useDarkMode() {
    const [darkMode, setDarkMode] = useState(() => {

        const saved = localStorage.getItem("darkMode");
        return saved === "true" ? true : false;
    });

    useEffect(() => {

        localStorage.setItem("darkMode", darkMode);

        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    return [darkMode, setDarkMode];
}