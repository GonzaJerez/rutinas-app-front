import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup'

import { BoxInput } from './BoxInput';
import { ButtonSubmit } from '../buttons/ButtonSubmit';
import { AuthContext } from '../../context/auth/AuthContext';
import { ThemeContext } from '../../context/theme/ThemeContext';

export const RegisterForm = () => {

    const {register} = useContext(AuthContext)
    const {theme:{colors}} = useContext(ThemeContext)

    return (
        <Formik
            initialValues={{
                name:      '',
                email:     '',
                email2:    '',
                password:  '',
                password2: ''
            }}
            onSubmit={ values => {
                register({
                    name: values.name,
                    email: values.email,
                    password: values.password
                })
            }}
            validationSchema={ Yup.object({
                name: Yup.string()
                        .max(15, 'El nombre no debe tener más de 15 caracteres')
                        .required('El nombre es obligatorio'),
                email: Yup.string()
                        .email('Email no válido')
                        .required('El email es obligatorio'),
                email2: Yup.string()
                        .oneOf([Yup.ref('email')], 'Los emails deben ser iguales')
                        .required('La confirmación del email es obligatoria'),
                password: Yup.string()
                        .required('La contraseña es obligatoria')
                        .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
                password2: Yup.string()
                        .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
                        .required('La confirmación de la contraseña es obligatoria')
            })}
        >
            {
                ({handleSubmit}) => (
                    <View style={ {...styles.container, backgroundColor:colors.card} }>

                        <BoxInput name='name' label='Ingrese su nombre' placeholder='Martin Gonzalez' marginTop='smallMT'/>

                        <BoxInput name='email' label='Ingrese su email' placeholder='email@gmail.com' email marginTop='smallMT'/>

                        <BoxInput name='email2' label='Confirme su email' placeholder='email@gmail.com' email marginTop='smallMT'/>

                        <BoxInput name='password' label='Ingrese su contraseña' placeholder='••••••' pass marginTop='smallMT'/>

                        <BoxInput name='password2' label='Confirme su contraseña' placeholder='••••••' pass marginTop='smallMT'/>

                        <ButtonSubmit text='Registrarme' onPress={handleSubmit} type='primary' style={ { width: 145, marginTop:30 } } />

                    </View>

                )
            }
        </Formik>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        marginBottom: 50,
        marginHorizontal:10,
        alignItems:'center',
        borderRadius:25,
        paddingHorizontal:15,
        paddingTop:10,
        paddingBottom:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    }
} );