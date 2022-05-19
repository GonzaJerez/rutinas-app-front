import 'react-native-gesture-handler';
import React from 'react'

import { ThemeProvider } from './src/context/theme/ThemeContext';
import { NativeStackNavigation } from './src/router/NativeStackNavigation';
import { AuthProvider } from './src/context/auth/AuthContext';
import { RoutinesProvider } from './src/context/routines/RoutinesContext';

const App = () => {
    return (
        <AppState>
            <NativeStackNavigation />
        </AppState>
    )
}

const AppState = ( { children }: any ) => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RoutinesProvider>
                { children }
                </RoutinesProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App