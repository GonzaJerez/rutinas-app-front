import { Theme } from "@react-navigation/native"


type ThemeAction =
    | { type: 'set_light_theme' }
    | { type: 'set_dark_theme' }

export interface ThemeState extends Theme {
    currentTheme: 'light' | 'dark',
    dividerColor: string,
    placeholderColor: string,
    strongPrimary?: string,
    lightPrimary: string,
    backgroundTransparent:string,
    errors: string
}

export const lightTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: 'rgba(0,0,0,0.2)',
    placeholderColor: '#ccc',
    strongPrimary: '#CA4B05',
    lightPrimary: '#E88753',
    errors: '#F52121',
    backgroundTransparent: 'rgba(255,255,255,0.5)',
    colors: {
        primary: '#ff6d00',
        background: '#fff',
        card: '#eee',
        text: '#111',
        border: 'orange',
        notification: 'teal',
    }
}

export const darkTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: 'rgba(255,255,255,0.5)',
    placeholderColor: '#8A8A8A',
    backgroundTransparent: '#ffffff90',
    lightPrimary: '#E88753',
    errors: 'red',
    colors: {
        primary: '#F47C1B',
        background: '#090909',
        card: 'green',
        text: '#ddd',
        border: 'orange',
        notification: 'teal',
    }
}

export const themeReducer = ( state: ThemeState, action: ThemeAction ): ThemeState => {
    switch ( action.type ) {
        case 'set_light_theme':
            return { ...lightTheme }

        case 'set_dark_theme':
            return { ...darkTheme }

        default:
            return state
    }
}