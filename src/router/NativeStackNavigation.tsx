import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeContext } from '../context/theme/ThemeContext';
import { AuthNavigator } from './AuthNavigator';
import { PrivateNavigator } from './PrivateNavigator';
import { AuthContext } from '../context/auth/AuthContext';
import { IntroApp } from '../components/IntroApp';


export type RootStackNavigation = {
    AuthNavigator: undefined,
    PrivateNavigator: undefined
}


const Stack = createNativeStackNavigator<RootStackNavigation>();
export const NativeStackNavigation = () => {

    const { theme } = useContext( ThemeContext )
    // Agarrar token del asyncStorage
    const {status} = useContext(AuthContext)

    if (status === 'checking') {
        return (
            <IntroApp />
        )
    }

    return (
        <NavigationContainer
            theme={ theme }
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {
                    (status === 'authenticated')
                        ? <Stack.Screen name="PrivateNavigator" component={ PrivateNavigator } />
                        : <Stack.Screen name="AuthNavigator" component={ AuthNavigator } />
                }
                
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}
