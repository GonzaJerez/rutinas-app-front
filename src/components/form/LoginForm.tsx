import React, { useContext, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

// Google
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import { ThemeContext } from '../../context/theme/ThemeContext'
import { BoxInput } from './BoxInput'
import { ButtonSubmit } from '../buttons/ButtonSubmit'
import { routinesApi } from '../../api/routinesApi'
import { AuthContext } from '../../context/auth/AuthContext'
import { SecondaryButton } from '../buttons/SecondaryButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootAuthNavigator } from '../../router/AuthNavigator';

const logoGoogle = require('../../assets/logo-google.png')


export const LoginForm = () => {

    const { theme } = useContext( ThemeContext )
    const { colors } = theme;

    const {navigate} = useNavigation<NativeStackNavigationProp<RootAuthNavigator, "LoginScreen">>()

    const {errorMsg, googleSignIn, login, clearErrors} = useContext(AuthContext)

    // Elimina los errores almacenados anteriormente cuando carga este componente
    useEffect(()=>{
        clearErrors()
    },[])

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '587299645131-h3vbttjua62lieoqcnpr43d3u9c1g22t.apps.googleusercontent.com',
        });
    },[])
    
    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const {idToken} = await GoogleSignin.signIn();

            if (idToken) {
                googleSignIn(idToken)
            }

        } catch (error: any) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              console.log('not avaliable');
              
            // play services not available or outdated
          } else {
            // some other error happened
            console.log(error);
            
          }
        }
      };

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={ async(values) => { 
                login(values)
            }}
            validationSchema={ Yup.object({
                email: Yup.string()
                        .email('Email no válido')
                        .required('El email es requerido'),
                password: Yup.string()
                        .min(6, 'La contraseña debe tener mínimo 6 caracteres')
                        .required('La contraseña es obligatoria')
            })}
        >
            {
                ({handleSubmit}) => (

                    <View style={ {...styles.container, backgroundColor:theme.colors.card} }>

                        <BoxInput label='Ingrese su email' name='email' placeholder='email@gmail.com' email marginTop='mediumMT' />

                        <BoxInput label='Ingrese su contraseña' name='password' placeholder='••••••' pass marginTop='mediumMT' />

                        {
                            (errorMsg !== '') && 
                                <View style={{marginBottom: 10, marginTop: -10}}>
                                    <Text style={{color:theme.errors, fontSize: 16}}>{errorMsg}</Text>
                                </View>
                        }
                        <ButtonSubmit 
                            text='Ingresar' 
                            onPress={handleSubmit} 
                            style={{marginTop:50}}
                        />

                        <View style={ { marginTop: 30, alignSelf:'flex-start' } }>
                            <SecondaryButton text='Olvidé mi contraseña' onPress={()=>navigate('ForgotPasswordScreen')}/>
                        </View>

                        <View style={ { ...styles.separator, borderColor: theme.dividerColor } } />

                        <View style={ { alignItems: 'center' } }>
                            <TouchableOpacity style={ styles.googleButton } onPress={signInWithGoogle}>
                                <View style={ styles.googleTextContainer }>
                                    <Text style={ {color: theme.whiteColor } }>Ingresar con Google</Text>
                                </View>
                                <View style={ {...styles.googleIconContainer, backgroundColor:theme.whiteColor} }>
                                    <Image
                                        style={ { ...styles.googleIcon } }
                                        source={ logoGoogle }
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }

        </Formik>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:25,
        paddingHorizontal:15,
        marginBottom:20,
        marginHorizontal:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    separator: {
        borderBottomWidth: 1,
        marginVertical: 35,
        width:'100%'
    },
    googleButton: {
        borderColor: '#1A8BF6',
        borderWidth: 1,
        flexDirection: 'row',
        height: 40,
        marginBottom: '10%',
        width: 230,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    googleTextContainer: {
        alignItems: 'center',
        backgroundColor: '#1A8BF6',
        flex: 5,
        justifyContent: 'center',
    },
    googleIconContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: 35,
    },
    googleIcon: {
        height: 25,
        width: 25,
    }
} );