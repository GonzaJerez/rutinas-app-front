import React, { useContext } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeContext } from "../context/theme/ThemeContext";
import { DetailsMovementScreen } from '../screens/movements/DetailsMovementScreen';
import { Movement, Day } from '../interfaces/interfaces';
import { SocialTopNavigator, RootSocialTopNavigator } from './SocialTopNavigator';
import { GroupRoutinesScreen } from '../screens/groups/GroupRoutinesScreen';
import { DetailsGroupScreen } from '../screens/groups/DetailsGroupScreen';
import { RoutineScreen } from '../screens/routines/RoutineScreen';
import { EditGroupScreen } from '../screens/groups/EditGroupScreen';
import { CreateGroupScreen } from '../screens/groups/CreateGroupScreen';
import { AddUsersToGroup } from '../screens/groups/AddUsersToGroup';
import { DayRoutineScreen } from '../screens/routines/DayRoutineScreen';


export type RootSocialNavigator = {
    SocialTopNavigator:     {screen:keyof RootSocialTopNavigator};
    DetailsMovementScreen:  {movement: Movement, isSent: boolean, dateSpanishFormat:string};
    DayRoutineScreen:       {numDay:number, day:Day, typeUnit: 'kg' | 'lb', timer:number, isMovement?:boolean}
    GroupRoutinesScreen:    undefined;
    DetailsGroupScreen:     undefined;
    EditGroupScreen:        undefined;
    CreateGroupScreen:      undefined;
    AddUsersToGroup:        undefined;
    RoutineScreen:          { idRoutine: string },
    WorkoutsInRoutineScreen:{actualDay: Day, numDay: number},
}

const Stack = createNativeStackNavigator<RootSocialNavigator>();

export const SocialNavigator = () => {

    const { theme } = useContext( ThemeContext )
    const {colors} = theme;

    return (
        <Stack.Navigator
            screenOptions={ {
                headerTitleStyle: {
                    fontSize: 21,
                },
                headerStyle: {
                    backgroundColor:(theme.currentTheme === 'dark') ? theme.colors.background : theme.colors.primary,
                },
                // headerShadowVisible:false,
                headerTitleAlign:'center',
                headerTintColor:theme.whiteColor
            } }
        >
            {/* TOP TAB */}
            <Stack.Screen 
                name="SocialTopNavigator" 
                component={ SocialTopNavigator } 
                options={{headerShown:false}} 
            />

            {/* MOVEMENTS SCREENS */}
            <Stack.Screen name="DetailsMovementScreen" component={ DetailsMovementScreen } options={{title:'Detalle movimiento'}} />
            <Stack.Screen name="DayRoutineScreen" component={ DayRoutineScreen } />

            {/* GROUPS SCREENS */}
            <Stack.Screen name="GroupRoutinesScreen" component={ GroupRoutinesScreen } />
            <Stack.Screen name="DetailsGroupScreen" component={ DetailsGroupScreen } />
            <Stack.Screen name="EditGroupScreen" component={ EditGroupScreen } options={{title:'Editar grupo'}}/>
            <Stack.Screen name="CreateGroupScreen" component={ CreateGroupScreen } options={{title:'Crear grupo'}}/>
            <Stack.Screen name="AddUsersToGroup" component={ AddUsersToGroup } options={{title:'Añadir usuarios'}}/>

            {/* ROUTINES SCREENS */}
            {/* Para que se mantenga en este stack al entrar a una rutina de grupo y no cambie al "RoutinesNavigator" */}
            <Stack.Screen name="RoutineScreen" component={ RoutineScreen } />
        </Stack.Navigator>
    )
}
