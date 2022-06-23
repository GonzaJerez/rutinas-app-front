import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import notifee from '@notifee/react-native';

import { ThemeProvider } from './src/context/theme/ThemeContext';
import { NativeStackNavigation } from './src/router/NativeStackNavigation';
import { AuthProvider } from './src/context/auth/AuthContext';
import { RoutinesProvider } from './src/context/routines/RoutinesContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MovementsProvider } from './src/context/movements/MovementsContext';
import { GroupsProvider } from './src/context/groups/GroupsContext';

const App = () => {

    const bootstrap = async()=>{
        const initialNotification = await notifee.getInitialNotification();

        if (initialNotification) {
        console.log('Notification caused application to open', initialNotification.notification);
        console.log('Press action used to open the app', initialNotification.pressAction);
        }
    }

    useEffect(() => {
        bootstrap()
        //   .then(() => setLoading(false))
          .catch(console.error);
      }, []);

    return (
        <GestureHandlerRootView style={{flex:1}}>
            <AppState>
                    
                    <NativeStackNavigation />
            </AppState>
        </GestureHandlerRootView>
    )
}

const AppState = ( { children }: any ) => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RoutinesProvider>
                    <MovementsProvider>
                        <GroupsProvider>
                            { children }
                        </GroupsProvider>
                    </MovementsProvider>
                </RoutinesProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App