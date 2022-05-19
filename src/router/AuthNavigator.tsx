import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";



export type RootAuthNavigator = {
    LoginScreen: undefined,
    RegisterScreen: undefined
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
        </Stack.Navigator>

    )
}
