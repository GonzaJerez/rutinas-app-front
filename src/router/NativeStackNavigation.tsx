import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'

import { ThemeContext } from '../context/theme/ThemeContext';
import { AuthNavigator } from './AuthNavigator';
import { PrivateNavigator, RootPrivateNavigator } from './PrivateNavigator';
import { AuthContext } from '../context/auth/AuthContext';
import { IntroApp } from '../components/IntroApp';
import { RoutinesContext } from '../context/routines/RoutinesContext';
import { LoaderRequest } from '../components/modals/LoaderRequest';
import { GroupsContext } from '../context/groups/GroupsContext';
import { StatusBar } from 'react-native';
import { OfflineModal } from '../components/modals/OfflineModal';


export type RootStackNavigation = {
    AuthNavigator: undefined,
    PrivateNavigator: undefined;
}


const Stack = createNativeStackNavigator<RootStackNavigation>();
export const NativeStackNavigation = () => {

    const { theme } = useContext( ThemeContext )
    const {status, isWaitingReqLogin, isModalOfflineOpen, setIsModalOfflineOpen} = useContext(AuthContext)
    const {isWaitingReqRoutines} = useContext(RoutinesContext)
    const {isWaitingReqGroup} = useContext(GroupsContext)

    useEffect(()=>{
        SplashScreen.hide()
    },[])

    if (status === 'checking') {
        return (
            <IntroApp />
        )
    }

    return (
        <NavigationContainer
            theme={ theme }
        >
            <StatusBar 
                translucent 
                backgroundColor={'transparent'} 
                barStyle={(theme.currentTheme === 'light')
                    ? 'dark-content'
                    : 'light-content'
                }
                networkActivityIndicatorVisible
            />
            {(isWaitingReqRoutines || isWaitingReqLogin || isWaitingReqGroup) 
                && <LoaderRequest />
            }

            <OfflineModal 
                isOpenModal={isModalOfflineOpen}
                setIsOpenModal={setIsModalOfflineOpen}
            />

            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {
                    (status === 'authenticated')
                        ? <Stack.Screen name="PrivateNavigator" component={ PrivateNavigator } />
                        : <Stack.Screen name="AuthNavigator" component={ AuthNavigator } />
                }
                
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}
