import React, { useState } from "react";

export const ThemeModeContext = React.createContext({
    isDarkTheme: false,
    toggleTheme: () => {}
})

const ThemeModeProvider: React.FC = ({children}: any) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const toggleTheme = (): void => {
        setIsDarkTheme(!isDarkTheme)
    }

    return (
        <ThemeModeContext.Provider value={{isDarkTheme, toggleTheme}} >
            {children}
        </ThemeModeContext.Provider>
    )
}

export default ThemeModeProvider