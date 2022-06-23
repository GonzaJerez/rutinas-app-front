import React, { useContext } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeContext } from "../context/theme/ThemeContext";
import { Day } from '../interfaces/interfaces';
import { RoutineScreen } from '../screens/routines/RoutineScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { DayRoutineScreen } from '../screens/routines/DayRoutineScreen';
import { DefaultRoutines } from '../screens/routines/DefaultRoutines';


export type RootRoutinesNavigator = {
    HomeScreen:              undefined;
    RoutineScreen:           { routineCreatorIsActualUser: boolean },
    DayRoutineScreen:        {numDay:number, day:Day, typeUnit: 'kg' | 'lb', timer:number, isMovement?:boolean}
    DefaultRoutines:         undefined;
}

const Stack = createNativeStackNavigator<RootRoutinesNavigator>();

export const RoutinesNavigator = () => {

    const { theme } = useContext( ThemeContext )
    const {colors} = theme;

    return (
        <Stack.Navigator
            screenOptions={ {
                headerTitleStyle: {
                    fontSize: 21,
                    // fontFamily:'Roboto'
                },
                headerStyle: {
                    backgroundColor: (theme.currentTheme === 'dark') ? theme.colors.background : theme.colors.primary,
                },
                // headerShadowVisible:false,
                headerTitleAlign:'center',
                headerTintColor:theme.whiteColor
            } }

        >
            <Stack.Screen name="HomeScreen" component={ HomeScreen } options={{title:''}}/>
            <Stack.Screen name="RoutineScreen" component={ RoutineScreen } />
            <Stack.Screen name="DayRoutineScreen" component={ DayRoutineScreen } />
            <Stack.Screen name="DefaultRoutines" component={ DefaultRoutines } />
        </Stack.Navigator>
    )
}
