import React, { useContext } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { ThemeContext } from '../../context/theme/ThemeContext'
import { Decoration } from '../../components/backgrounds/Decoration'
import { NameApp } from '../../components/headers/NameApp'
import { RegisterForm } from '../../components/form/RegisterForm'
import { RootAuthNavigator } from '../../router/AuthNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoApp } from '../../components/LogoApp';


interface Props extends NativeStackScreenProps<RootAuthNavigator, 'LoginScreen'>{}

export const RegisterScreen = ({navigation}:Props) => {

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

                    <View style={ styles.registerContainer }>
                        <View style={ styles.loginBox }>
                            <RegisterForm />
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={ styles.loginContainer }>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('LoginScreen')}
                >
                    <Text style={ { color: theme.whiteColor } }>Ya tengo una cuenta</Text>
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
        bottom:40,
        justifyContent: 'center',
        left: 20,
        position: 'absolute',
    }
} );