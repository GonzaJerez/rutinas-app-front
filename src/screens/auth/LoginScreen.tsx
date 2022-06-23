import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, Platform, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { ThemeContext } from '../../context/theme/ThemeContext'
import { Decoration } from '../../components/backgrounds/Decoration'
import { LoginForm } from '../../components/form/LoginForm'
import { NameApp } from '../../components/headers/NameApp'
import { RootAuthNavigator } from '../../router/AuthNavigator'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoApp } from '../../components/LogoApp'


interface Props extends NativeStackScreenProps<RootAuthNavigator, 'LoginScreen'>{}

export const LoginScreen = ({navigation}:Props) => {

    const { theme } = useContext( ThemeContext )
    const {colors} = theme;

    return (
        <SafeAreaView style={ { ...styles.container, backgroundColor: colors.background } }>
            <Decoration bgColor={colors.primary} />
            
            <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <ScrollView>
                    <NameApp size='big' style={styles.title}/>

                    <View style={ styles.loginContainer }>
                        <View style={ styles.loginBox }>
                            <LoginForm />
                        </View>

                    </View>
                
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={ styles.registerContainer }>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('RegisterScreen') }
                >
                    <Text style={ { color: theme.whiteColor } }>Registrarme</Text>
                </TouchableOpacity>
            </View>

            <LogoApp style={{position:'absolute', bottom:20}}/>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems:'center'
    },
    title:{
        marginTop:40,
        textAlign:'center'
    },
    loginContainer: {
        alignItems: 'center',
        // flex: 3,
        justifyContent: 'center',
        marginTop: 30,
    },
    loginBox: {
        flex: 1,
    },
    
    registerContainer: {
        alignItems: 'center',
        bottom: 50,
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
    }
} );