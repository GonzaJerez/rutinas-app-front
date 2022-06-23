import { Theme } from "@react-navigation/native"


type ThemeAction =
    | { type: 'set_light_theme' }
    | { type: 'set_dark_theme' }

export interface ThemeState extends Theme {
    backgroundModal:    string;
    backgroundTransparent:string,
    currentTheme:       'light' | 'dark',
    cardTransparent:    string;
    darkPrimary:        string;
    disabledColor:      string;
    dividerColor:       string,
    errors:             string,
    grey:               string;
    light:              string;
    lightText:          string;
    lightPrimary:       string,
    placeholderColor:   string,
    strongPrimary:      string,
    whiteColor:         string;
}

export const lightTheme: ThemeState = {
    backgroundModal: '#11111190',
    backgroundTransparent: '#ffffff99',
    cardTransparent: '#eeeeee99',
    currentTheme: 'light',
    dark: false,
    darkPrimary: '#E96501',
    disabledColor: '#77777790',
    dividerColor: '#ccc',
    errors: '#F52121',
    grey: '#888',
    light: '#ffab40',
    lightText: '#00000090',
    lightPrimary: '#ff9100',
    placeholderColor: '#888',
    strongPrimary: '#CA4B05',
    whiteColor: '#fff',
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
    backgroundModal: '#dddddd30',
    backgroundTransparent: '#22222299',
    cardTransparent: '#33333399',
    currentTheme: 'dark',
    dark: true,
    darkPrimary: '#D55C01',
    disabledColor: '#aaaaaa90',
    dividerColor: '#555',
    errors: '#F52121',
    grey: '#888',
    light: '#ffab40',
    lightText: '#eeeeee90',
    lightPrimary: '#ff9100',
    placeholderColor: '#8A8A8A',
    strongPrimary: '#CA4B05',
    whiteColor: '#fff',
    colors: {
        primary: '#ff6d00',
        background: '#222',
        card: '#333',
        text: '#eee',
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