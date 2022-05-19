import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { ThemeContext } from '../context/theme/ThemeContext'
import { Decoration } from '../components/Decoration'
import { LoginForm } from '../components/form/LoginForm'
import { NameApp } from '../components/NameApp'
import { RootAuthNavigator } from '../router/AuthNavigator'


const windowHeight = Dimensions.get( 'window' ).height

interface Props extends NativeStackScreenProps<RootAuthNavigator, 'LoginScreen'>{}

export const LoginScreen = ({navigation}:Props) => {

    const { theme: { colors } } = useContext( ThemeContext )

    return (
        <View style={ { ...styles.container, backgroundColor: colors.background } }>
            <Decoration bgColor={colors.primary} />

            <ScrollView>
                <NameApp size='big'/>

                <View style={ styles.loginContainer }>
                    <View style={ styles.loginBox }>
                        <LoginForm />
                    </View>

                </View>
            </ScrollView>

            <View style={ styles.registerContainer }>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('RegisterScreen') }
                >
                    <Text style={ { color: colors.background, fontSize: 16 } }>Registrarme</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    loginContainer: {
        alignItems: 'center',
        // flex: 3,
        justifyContent: 'center',
        marginTop: 80,
    },
    loginBox: {
        flex: 1,
        width: '80%',
    },
    
    registerContainer: {
        alignItems: 'center',
        // bottom: 40,
        top: windowHeight - 80,
        // flex: 2,
        justifyContent: 'center',
        // left: 100,
        position: 'absolute',
        right: 20,
    }
} );