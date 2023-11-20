import React, { useState, useContext } from "react";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme(){
    return useContext(ThemeContext);
}
export function useUpdateTheme(){
    return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
    const [darkTheme, setDatkTheme] = useState(true);

    function toogleTheme() {
        setDatkTheme(dark => !dark)
    }

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toogleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider >
    )
}