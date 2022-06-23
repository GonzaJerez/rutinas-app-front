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
import { ScrollView } from 'react-native-gesture-handler';

export const EditEmailScreen = () => {

    const { goBack } = useNavigation<any>()
    const { theme } = useContext( ThemeContext )
    const { colors } = theme;
    const { user, updateUser } = useContext( AuthContext )

    return (
        <ScrollView>
            <View style={ styles.container }>

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
                                    <Text style={ {...styles.labelInput, color:theme.disabledColor} }>Email actual</Text>
                                    <Text style={ { ...styles.textInput, padding: 5, borderColor: colors.primary, color: theme.colors.text } }>{ user?.email }</Text>
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
        </ScrollView>
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
        width: 330
    },
    labelInput: {
        fontSize: 16,
        paddingLeft: 5
    },
    textInput: {
        marginTop: 10,
        paddingLeft: 5,
        fontSize: 18
    },
    buttonsContainer: {
        marginTop: 80,
        marginBottom:40,
        height: 100,
        justifyContent: 'space-between',
    }
} );