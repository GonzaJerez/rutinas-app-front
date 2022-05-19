import React, { createContext, useEffect, useReducer } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, themeReducer, ThemeState } from "./themeReducer";

interface ThemeContextProps {
    theme: ThemeState,
    setDarkTheme: () => void,
    setLightTheme: () => void,
}

export const ThemeContext = createContext( {} as ThemeContextProps )

export const ThemeProvider = ( { children }: any ) => {

    const colorScheme = useColorScheme()

    const [ theme, dispatch ] = useReducer( themeReducer, ( colorScheme === 'dark' ) ? darkTheme : lightTheme )

    useEffect( () => {
        ( colorScheme === 'light' )
            ? setLightTheme()
            : setDarkTheme()
    }, [ colorScheme ] )


    const setDarkTheme = () => {
        dispatch( { type: 'set_dark_theme' } )
    }

    const setLightTheme = () => {
        dispatch( { type: 'set_light_theme' } )
    }

    return (
        <ThemeContext.Provider
            value={ {
                theme,
                setDarkTheme,
                setLightTheme
            } }
        >
            { children }
        </ThemeContext.Provider>
    )
}