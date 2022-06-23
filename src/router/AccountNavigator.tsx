import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { ThemeContext } from "../context/theme/ThemeContext";
import { EditProfileScreen } from "../screens/account/EditProfileScreen";
import { AccountScreen } from '../screens/AccountScreen';
import { EditEmailScreen } from '../screens/account/EditEmailScreen';
import { EditPasswordScreen } from '../screens/account/EditPasswordScreen';


export type RootAccountNavigator = {
    AccountScreen:        undefined;
    EditProfileScreen:    undefined;
    EditEmailScreen:      undefined;
    EditPasswordScreen:   undefined;
}

const Stack = createNativeStackNavigator<RootAccountNavigator>();

export const AccountNavigator = () => {

    const { theme } = useContext( ThemeContext )
    const {colors} = theme;

    return (
        <Stack.Navigator
            screenOptions={ {
                headerTitleStyle: {
                    fontSize: 21,
                },
                headerStyle: {
                    backgroundColor: (theme.currentTheme === 'dark') ? theme.colors.background : theme.colors.primary,
                },
                headerTitleAlign:'center',
                headerTintColor:theme.whiteColor
            } }

        >
            <Stack.Screen name="AccountScreen" component={ AccountScreen } options={{title: 'Cuenta'}} />
            <Stack.Screen name="EditProfileScreen" component={ EditProfileScreen } options={{title: 'Editar perfil'}} />
            <Stack.Screen name="EditEmailScreen" component={ EditEmailScreen } options={{title: 'Editar email'}} />
            <Stack.Screen name="EditPasswordScreen" component={ EditPasswordScreen } options={{title: 'Editar contraseña'}}/>
        </Stack.Navigator>
    )
}
