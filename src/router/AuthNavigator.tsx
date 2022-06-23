import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { ConfirmCodeEmailScreen } from '../screens/auth/ConfirmCodeEmailScreen';
import { UpdatePasswordScreen } from '../screens/auth/UpdatePasswordScreen';



export type RootAuthNavigator = {
    LoginScreen:            undefined,
    RegisterScreen:         undefined
    ForgotPasswordScreen:   undefined;
    ConfirmCodeEmailScreen: {emailUser:string};
    UpdatePasswordScreen:   {emailUser:string};
}


const Stack = createNativeStackNavigator<RootAuthNavigator>();
export const AuthNavigator = () => {

    return (
        <Stack.Navigator
            screenOptions={ {
                headerShown: false
            } }
        >
            <Stack.Screen name="LoginScreen" component={ LoginScreen } />
            <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
            <Stack.Screen name="ForgotPasswordScreen" component={ ForgotPasswordScreen } />
            <Stack.Screen name="ConfirmCodeEmailScreen" component={ ConfirmCodeEmailScreen } />
            <Stack.Screen name="UpdatePasswordScreen" component={ UpdatePasswordScreen } />
        </Stack.Navigator>

    )
}
