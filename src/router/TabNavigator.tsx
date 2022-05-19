import React, { useContext } from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { Account } from "../screens/Account";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ThemeContext } from '../context/theme/ThemeContext';
import { View } from 'react-native';



export type RootTabNavigator = {
    HomeScreen: undefined,
    Account: undefined
}


const Tab = createMaterialBottomTabNavigator<RootTabNavigator>();

export const TabNavigator = () => {

    const { theme } = useContext( ThemeContext )

    return (
        <Tab.Navigator
            barStyle={ { backgroundColor: theme.colors.background, height:60 } }
            activeColor={ theme.colors.primary }
            sceneAnimationEnabled={ true }
            
            screenOptions={ ( { route } ) => ( {
                tabBarIcon: ( { color, focused } ) => {
                    let iconName: string = '';

                    switch ( route.name ) {
                        case 'HomeScreen':
                            iconName = 'barbell-outline'
                            break;

                        case 'Account':
                            iconName = 'person-circle-outline'
                            break;
                        default:
                            break;
                    }

                    return (
                        <View style={{height:40, width: 40, transform:[{rotate: route.name === 'HomeScreen' ? '45deg': '0deg'}]}}>
                            <Icon name={ iconName } size={ 35 } color={ focused ? color : '#aaa' } />
                        </View>
                    )
                },
            } ) }
            labeled={ false }
        >
            <Tab.Screen name="HomeScreen" component={ HomeScreen } />

            <Tab.Screen name="Account" component={ Account } />
        </Tab.Navigator>


    )
}