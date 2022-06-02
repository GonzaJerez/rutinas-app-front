import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { ThemeContext } from "../context/theme/ThemeContext";
import { MovementsScreen } from '../screens/MovementsScreen';


export type RootMovementsNavigator = {
    MovementsScreen: undefined;
}

const Stack = createNativeStackNavigator<RootMovementsNavigator>();

export const MovementsNavigator = () => {

    const { theme: { colors } } = useContext( ThemeContext )

    return (
        <Stack.Navigator
            screenOptions={ {
                // headerShown: false,
                headerTitleStyle: {
                    color: colors.background,
                    fontSize: 23,
                    fontFamily: 'Roboto'
                },
                headerStyle: {
                    backgroundColor: colors.primary,
                }
            } }

        >
            <Stack.Screen name="MovementsScreen" component={ MovementsScreen } options={{title:'Movimientos'}} />
        </Stack.Navigator>
    )
}
