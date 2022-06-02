import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { HeaderTitleBack } from '../../components/headers/HeaderTitleBack';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { BoxInput } from '../../components/form/BoxInput';

export const EditPassword = () => {

    const { goBack } = useNavigation<any>()
    const { theme } = useContext( ThemeContext )
    const { updateUser } = useContext( AuthContext )

    return (
        <View style={ styles.container }>
            <View style={ styles.title }>
                <HeaderTitleBack text='Editar email' />
            </View>

            <Formik
                initialValues={ {
                    actualPassword: '',
                    password1: '',
                    password2: '',
                } }
                onSubmit={ values => {
                    updateUser({
                        actualPassword: values.actualPassword,
                        newPassword: values.password1
                    })
                } }
                validationSchema={ Yup.object( {
                    actualPassword: Yup.string()
                        .required('La contraseña es obligatoria')
                        .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
                    password1: Yup.string()
                        .required('La contraseña es obligatoria')
                        .min(6, 'La contraseña debe tener mínimo 6 caracteres')
                        .notOneOf([Yup.ref('actualPassword')], 'La contraseña no puede ser igual a la anterior'),
                    password2: Yup.string()
                        .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
                        .required('La confirmación de la contraseña es obligatoria')
                } ) }
            >
                {
                    ( { handleSubmit } ) => (
                        <View style={ styles.dataUserContainer }>
                            <BoxInput name='actualPassword' label='Ingrese su contraseña actual' placeholder='••••••' pass />
                            <BoxInput name='password1' label='Ingrese nueva contraseña' placeholder='••••••' />
                            <BoxInput name='password2' label='Confirme su nueva contraseña' placeholder='••••••' />
                            <View style={ styles.buttonsContainer }>
                                <ButtonSubmit text='Guardar' onPress={ handleSubmit } />
                                <SecondaryButton text='Cancelar' onPress={ goBack } />
                            </View>
                        </View>
                    )
                }
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        alignSelf: 'flex-start',
        marginTop: 20,
    },
    dataUserContainer: {
        marginTop: 50,
        alignItems: 'center',
        // marginBottom: 80
    },
    emailContainer: {
        marginTop: 50,
        width: 350
    },
    labelInput: {
        fontSize: 18,
        paddingLeft: 5
    },
    textInput: {
        // borderWidth:1,
        borderBottomWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        fontSize: 20
    },
    buttonsContainer: {
        marginTop: 80,
        height: 100,
        justifyContent: 'space-between',
    }
} );