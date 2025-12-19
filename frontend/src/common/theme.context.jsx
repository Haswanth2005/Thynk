import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState("light");

    useEffect(() => {

        let themeInStorage = localStorage.getItem("theme");

        if (themeInStorage) {
            setTheme(themeInStorage);
        }

        // Apply theme to body
        document.body.setAttribute('data-theme', themeInStorage || 'light');

    }, [])

    const toggleTheme = () => {
        let newTheme = theme == 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem("theme", newTheme);
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}
