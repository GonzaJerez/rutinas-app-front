import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { ThemeContext } from "../context/theme/ThemeContext";
import { EditProfile } from "../screens/account/EditProfile";
import { AccountScreen } from '../screens/AccountScreen';
import { EditEmail } from '../screens/account/EditEmail';
import { EditPassword } from '../screens/account/EditPassword';


export type RootAccountNavigator = {
    AccountScreen:  undefined;
    EditProfile:    undefined;
    EditEmail:      undefined;
    EditPassword:   undefined;
}

const Stack = createNativeStackNavigator<RootAccountNavigator>();

export const AccountNavigator = () => {

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
            <Stack.Screen name="AccountScreen" component={ AccountScreen } />
            <Stack.Screen name="EditProfile" component={ EditProfile } />
            <Stack.Screen name="EditEmail" component={ EditEmail } />
            <Stack.Screen name="EditPassword" component={ EditPassword } />
        </Stack.Navigator>
    )
}
