import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MovementsScreen } from '../screens/MovementsScreen';
import { GroupsScreen } from '../screens/GroupsScreen';
import { ThemeContext } from '../context/theme/ThemeContext';
import { Group } from '../interfaces/interfaces';

export type RootSocialTopNavigator = {
    MovementsScreen:    undefined;
    GroupsScreen:       undefined;
    
    GroupRoutinesScreen: undefined;
    CreateGroupScreen:   undefined;
}

const Tab = createMaterialTopTabNavigator();

export const SocialTopNavigator = () => {

    const { theme } = useContext( ThemeContext )

    return (
        <Tab.Navigator
            screenOptions={ {
                tabBarStyle: {
                    backgroundColor:(theme.currentTheme === 'dark') ? theme.colors.background : theme.colors.primary,
                    paddingTop: 30,
                },
                tabBarActiveTintColor: theme.whiteColor,
                tabBarPressOpacity: 0.1,
                tabBarPressColor: theme.colors.card,
                tabBarLabelStyle: {fontSize:14},
                tabBarIndicatorStyle:{backgroundColor:theme.colors.primary},
            } }
        >
            <Tab.Screen name="MovementsScreen" component={ MovementsScreen } options={ { title: 'Movimientos' } } />
            <Tab.Screen name="GroupsScreen" component={ GroupsScreen } options={ { title: 'Grupos' } } />
        </Tab.Navigator>
    );
}