import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeContext } from "../context/theme/ThemeContext";
import { TabNavigator } from './TabNavigator';
import { Day, Muscle, Workout, WorkoutInRoutine } from '../interfaces/interfaces';
import { ChooseMuscleScreen } from '../screens/ChooseMuscleScreen';
import { ChooseWorkoutScreen } from "../screens/ChooseWorkoutScreen";
import { CreateWorkout } from "../screens/CreateWorkout";
import { FormRoutineScreen } from "../screens/FormRoutineScreen";
import { RoutineScreen } from '../screens/RoutineScreen';
import { WorkoutsInRoutineScreen } from "../screens/WorkoutsInRoutineScreen";

export type RootPrivateNavigator = {
    TabNavigator: undefined,
    FormRoutineScreen: undefined,
    ChooseMuscleScreen: undefined,
    ChooseWorkoutScreen: { muscle: Muscle, idDay: string },
    CreateWorkout: { workout: Workout, idDay: string, workoutInRoutine:WorkoutInRoutine },
    RoutineScreen: { idRoutine: string },
    WorkoutsInRoutineScreen: {actualDay: Day, numDay: number}
}

const Stack = createNativeStackNavigator<RootPrivateNavigator>();

export const PrivateNavigator = () => {

    const { theme: { colors } } = useContext( ThemeContext )

    return (
        <Stack.Navigator
            screenOptions={ {
                headerShown: false,
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

            <Stack.Screen name="TabNavigator" component={ TabNavigator } />
            <Stack.Screen name="FormRoutineScreen" component={ FormRoutineScreen } />
            <Stack.Screen name="ChooseMuscleScreen" component={ ChooseMuscleScreen } />
            <Stack.Screen name="ChooseWorkoutScreen" component={ ChooseWorkoutScreen } />
            <Stack.Screen name="CreateWorkout" component={ CreateWorkout } />
            <Stack.Screen name="RoutineScreen" component={ RoutineScreen } />
            <Stack.Screen name="WorkoutsInRoutineScreen" component={ WorkoutsInRoutineScreen } />
        </Stack.Navigator>
    )
}

