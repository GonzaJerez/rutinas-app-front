import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeContext } from "../context/theme/ThemeContext";
import { TabNavigator } from './TabNavigator';
import { Day, Muscle, Workout, WorkoutInRoutine, CombinedWorkout } from '../interfaces/interfaces';
import { ChooseMuscleScreen } from '../screens/routines/ChooseMuscleScreen';
import { ChooseWorkoutScreen } from "../screens/routines/ChooseWorkoutScreen";
import { CreateWorkoutScreen } from "../screens/routines/CreateWorkoutScreen";
import { FormRoutineScreen } from "../screens/routines/FormRoutineScreen";
import { RoutineScreen } from '../screens/routines/RoutineScreen';
import { EditProfileScreen } from '../screens/account/EditProfileScreen';
import { TrainingScreen } from "../screens/routines/TrainingScreen";

export type RootPrivateNavigator = {
    TabNavigator: undefined,
    FormRoutineScreen: undefined,
    ChooseMuscleScreen: {isEditingWorkout?:boolean, numDay?:string },
    ChooseWorkoutScreen: { muscle: Muscle, idDay: string },
    CreateWorkoutScreen: { workout: Workout, idDay: string, combinedWorkouts:CombinedWorkout, workoutInRoutine?:WorkoutInRoutine, initialSlide?: number },
    TrainingScreen: {dayRoutine: Day};
}

const Stack = createNativeStackNavigator<RootPrivateNavigator>();

export const PrivateNavigator = () => {

    const { theme } = useContext( ThemeContext )
    const {colors} = theme;

    return (
        <Stack.Navigator
            screenOptions={ {
                headerShown: false,
                headerTitleStyle: {
                    fontSize: 21,
                },
                headerStyle: {
                    backgroundColor: (theme.currentTheme === 'dark') ? theme.colors.background : theme.colors.primary,
                },
                // headerShadowVisible:false,
                headerTitleAlign:'center',
                headerTintColor:theme.whiteColor
            } }

        >
            <Stack.Screen name="TabNavigator" component={ TabNavigator } />
            <Stack.Screen name="FormRoutineScreen" component={ FormRoutineScreen } />
            <Stack.Screen name="ChooseMuscleScreen" component={ ChooseMuscleScreen } />
            <Stack.Screen name="ChooseWorkoutScreen" component={ ChooseWorkoutScreen } />
            <Stack.Screen name="CreateWorkoutScreen" component={ CreateWorkoutScreen } />
            <Stack.Screen name="TrainingScreen" component={ TrainingScreen } />
        </Stack.Navigator>
    )
}

