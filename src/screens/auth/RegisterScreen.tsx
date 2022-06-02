import React, { useContext } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { ThemeContext } from '../../context/theme/ThemeContext'
import { Decoration } from '../../components/backgrounds/Decoration'
import { NameApp } from '../../components/headers/NameApp'
import { RegisterForm } from '../../components/form/RegisterForm'
import { RootAuthNavigator } from '../../router/AuthNavigator';


const windowHeight = Dimensions.get( 'window' ).height

interface Props extends NativeStackScreenProps<RootAuthNavigator, 'LoginScreen'>{}

export const RegisterScreen = ({navigation}:Props) => {

    const { theme: { colors } } = useContext( ThemeContext )

    return (
        <View style={ { ...styles.container, backgroundColor: colors.background } }>
            <Decoration bgColor={colors.primary} />

            <ScrollView>
                <NameApp size='big' style={styles.title}/>

                <View style={ styles.registerContainer }>
                    <View style={ styles.loginBox }>
                        <RegisterForm />
                    </View>

                </View>
            </ScrollView>

            <View style={ styles.loginContainer }>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('LoginScreen')}
                >
                    <Text style={ { color: colors.background, fontSize: 16 } }>Ya tengo una cuenta</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    registerContainer: {
        alignItems: 'center',
        flex: 6,
        justifyContent: 'center',
        marginTop: 40,
    },
    loginBox: {
        flex: 1,
    },
    loginContainer: {
        alignItems: 'center',
        // bottom: 40,
        top: windowHeight - 80,
        // flex: 2,
        justifyContent: 'center',
        left: 20,
        position: 'absolute',
        // right: 100,
    }
} );