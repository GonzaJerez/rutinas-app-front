import { Theme } from "@react-navigation/native"


type ThemeAction =
    | { type: 'set_light_theme' }
    | { type: 'set_dark_theme' }

export interface ThemeState extends Theme {
    currentTheme:       'light' | 'dark',
    dividerColor:       string,
    placeholderColor:   string,
    strongPrimary?:     string,
    light:              string;
    lightPrimary:       string,
    backgroundTransparent:string,
    errors:             string,
    disabledColor:      string;
    grey:               string;
}

export const lightTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: 'rgba(0,0,0,0.2)',
    placeholderColor: '#ccc',
    strongPrimary: '#CA4B05',
    light: '#ffab40',
    lightPrimary: '#ff9100',
    errors: '#F52121',
    backgroundTransparent: 'rgba(255,255,255,0.5)',
    disabledColor: '#bbb',
    grey: '#888',
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
    disabledColor: '#bbb',
    light: '#ffab40',
    lightPrimary: '#E88753',
    errors: 'red',
    grey: '#888',
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