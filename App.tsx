import 'react-native-gesture-handler';
import React from 'react'

import { ThemeProvider } from './src/context/theme/ThemeContext';
import { NativeStackNavigation } from './src/router/NativeStackNavigation';
import { AuthProvider } from './src/context/auth/AuthContext';
import { RoutinesProvider } from './src/context/routines/RoutinesContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SocketProvider } from './src/context/socket/SocketContext';

const App = () => {
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <AppState>
                    <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/>
                    <NativeStackNavigation />
            </AppState>
        </GestureHandlerRootView>
    )
}

const AppState = ( { children }: any ) => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RoutinesProvider>
                    <SocketProvider>
                        { children }
                    </SocketProvider>
                </RoutinesProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App