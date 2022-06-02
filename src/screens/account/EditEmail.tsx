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

export const EditEmail = () => {

    const { goBack } = useNavigation<any>()
    const { theme } = useContext( ThemeContext )
    const { colors } = theme;
    const { user, updateUser } = useContext( AuthContext )

    return (
        <View style={ styles.container }>
            <View style={ styles.title }>
                <HeaderTitleBack text='Editar email' />
            </View>

            <Formik
                initialValues={ {
                    email1: '',
                    email2: '',
                } }
                onSubmit={ values => {
                    updateUser( values )
                } }
                validationSchema={ Yup.object( {
                    email1: Yup.string()
                        .email( 'Email no válido' )
                        .required( 'El email es obligatorio' ),
                    email2: Yup.string()
                        .oneOf( [ Yup.ref( 'email1' ) ], 'Los emails deben ser iguales' )
                        .required( 'La confirmación del email es obligatoria' )
                } ) }
            >
                {
                    ( { handleSubmit } ) => (
                        <View style={ styles.dataUserContainer }>
                            <View style={ styles.emailContainer }>
                                <Text style={ styles.labelInput }>Email actual</Text>
                                <Text style={ { ...styles.textInput, padding: 5, borderColor: colors.primary, color: colors.text } }>{ user?.email }</Text>
                            </View>
                            <BoxInput name='email1' label='Ingrese nuevo email' placeholder='email@gmail.com' />
                            <BoxInput name='email2' label='Confirme su nuevo email' placeholder='email@gmail.com' />
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