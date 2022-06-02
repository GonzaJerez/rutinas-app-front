import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { ThemeContext } from "../context/theme/ThemeContext";
import { EditProfile } from "../screens/account/EditProfile";
import { AccountScreen } from '../screens/AccountScreen';
import { EditEmail } from '../screens/account/EditEmail';
import { EditPassword } from '../screens/account/EditPassword';
import { Day } from '../interfaces/interfaces';
import { RoutineScreen } from '../screens/routines/RoutineScreen';
import { WorkoutsInRoutineScreen } from '../screens/routines/WorkoutsInRoutineScreen';
import { HomeScreen } from '../screens/HomeScreen';


export type RootRoutinesNavigator = {
    HomeScreen:              undefined;
    RoutineScreen:           { idRoutine: string },
    WorkoutsInRoutineScreen: {actualDay: Day, numDay: number},
}

const Stack = createNativeStackNavigator<RootRoutinesNavigator>();

export const RoutinesNavigator = () => {

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
                    
                },
                headerShadowVisible:false,
                // headerTransparent:true
            } }

        >
            <Stack.Screen name="HomeScreen" component={ HomeScreen } options={{title:'Rutinas app'}}/>
            <Stack.Screen name="RoutineScreen" component={ RoutineScreen } />
            <Stack.Screen name="WorkoutsInRoutineScreen" component={ WorkoutsInRoutineScreen } />
        </Stack.Navigator>
    )
}
