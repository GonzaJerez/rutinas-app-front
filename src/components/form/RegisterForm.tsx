import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup'

import { BoxInput } from './BoxInput';
import { ButtonSubmit } from './ButtonSubmit';
import { AuthContext } from '../../context/auth/AuthContext';

export const RegisterForm = () => {

    const {register} = useContext(AuthContext)

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
                register(values)
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
                    <View style={ styles.container }>

                        <BoxInput name='name' label='Ingrese su nombre' placeholder='Martin Gonzalez' />

                        <BoxInput name='email' label='Ingrese su email' placeholder='email@gmail.com' />

                        <BoxInput name='email2' label='Confirme su email' placeholder='email@gmail.com' />

                        <BoxInput name='password' label='Ingrese su contraseña' placeholder='Contraseña' />

                        <BoxInput name='password2' label='Confirme su contraseña' placeholder='Contraseña' />

                        <ButtonSubmit text='Registrarme' onPress={handleSubmit} type='secondary' style={ { width: 145 } } />

                    </View>

                )
            }
        </Formik>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        marginBottom: 50
    }
} );