import React, { useContext } from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { AccountScreen } from "../screens/AccountScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ThemeContext } from '../context/theme/ThemeContext';
import { View } from 'react-native';
import { AccountNavigator } from './AccountNavigator';
import { RoutinesNavigator } from './RoutinesNavigator';
import { SocialNavigator } from './SocialNavigator';



export type RootTabNavigator = {
    RoutinesNavigator:  undefined;
    AccountNavigator:   undefined;
    SocialNavigator: undefined;
}


const Tab = createMaterialBottomTabNavigator<RootTabNavigator>();

export const TabNavigator = () => {

    const { theme } = useContext( ThemeContext )

    return (
        <Tab.Navigator
            barStyle={ { backgroundColor: theme.colors.background, height:70 } }
            activeColor={ theme.colors.primary }
            sceneAnimationEnabled={ true }  
            screenOptions={ ( { route } ) => ( {
                tabBarIcon: ( { color, focused } ) => {
                    let iconName: string = '';

                    switch ( route.name ) {
                        case 'RoutinesNavigator':
                            iconName = 'barbell-outline'
                            break;

                        case 'SocialNavigator':
                            iconName = 'people-outline'
                            break;

                        case 'AccountNavigator':
                            iconName = 'person-circle-outline'
                            break;

                        default:
                            break;
                    }

                    return (
                        <View style={{height:40, width: 40, transform:[{rotate: route.name === 'RoutinesNavigator' ? '45deg': '0deg'}]}}>
                            <Icon name={ iconName } size={ 35 } color={ focused ? color : '#aaa' } />
                        </View>
                    )
                },
            } ) }
            labeled={ false }
        >
            <Tab.Screen name="RoutinesNavigator" component={ RoutinesNavigator } />
            <Tab.Screen name="SocialNavigator" component={ SocialNavigator } />
            <Tab.Screen name="AccountNavigator" component={ AccountNavigator } />
        </Tab.Navigator>


    )
}