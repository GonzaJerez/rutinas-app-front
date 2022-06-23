import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { BoxInput } from '../../components/form/BoxInput';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { Decoration } from '../../components/backgrounds/Decoration';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { NameApp } from '../../components/headers/NameApp';
import { GoBack } from '../../components/headers/GoBack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/auth/AuthContext';
import { renewPasswordApi } from '../../helpers/auth/authApis';
import { RecoverPasswordResponse } from '../../interfaces/interfaces';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootAuthNavigator } from '../../router/AuthNavigator';
import { TextError } from '../../components/TextError';

interface Props extends NativeStackScreenProps<RootAuthNavigator,'UpdatePasswordScreen'>{}

export const UpdatePasswordScreen = ({navigation,route}:Props) => {

    const {emailUser} = route.params;

    const {theme:{colors}} = useContext(ThemeContext)
    const {setIsWaitingReqLogin} = useContext(AuthContext)
    const [error, setError] = useState<string>()

    const onRenewPassword = async(newPassword:string)=>{
        setIsWaitingReqLogin(true)
        try {
            const {msg}:RecoverPasswordResponse = await renewPasswordApi({emailUser,newPassword})
            
            // Si hay error desde el backend
            if (msg) {
                return setError(msg)
            }
            setError(undefined)
            Alert.alert(
                '¡Actualización exitosa!', 
                'La contraseña ha sido actualizada correctamente',
                [{
                    text:'Volver al inicio',
                    onPress: ()=>navigation.popToTop()
                }],
                {
                    cancelable:false
                }
            )
            

        } catch (err) {
            console.log(err);
            setError('Ocurrió un error, intente nuevamente o comuniquese con el administrador')
        }
        finally{
            setIsWaitingReqLogin(false)
        }
    }

    return (
        <SafeAreaView style={ {...styles.container, backgroundColor: colors.background} }>
            <Decoration bgColor={colors.primary} />
            <GoBack style={{top:50, left:20}}/>
            <ScrollView>
                
                <NameApp size='big' style={styles.title}/>

                <View>
                    <Text style={{...styles.subtitle, color:colors.text}}>Actualizar contraseña</Text>
                    <Formik
                        initialValues={ {
                            password1: '',
                            password2: '',
                        } }
                        onSubmit={ values => {
                            onRenewPassword(values.password1)
                        } }
                        validationSchema={ Yup.object( {
                            password1: Yup.string()
                                .required('La contraseña es obligatoria')
                                .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
                            password2: Yup.string()
                                .oneOf([Yup.ref('password1')], 'Las contraseñas deben ser iguales')
                                .required('La confirmación de la contraseña es obligatoria')
                        } ) }
                    >
                        {
                            ( { handleSubmit } ) => (
                                <View style={ styles.dataUserContainer }>
                                    <BoxInput name='password1' label='Ingrese nueva contraseña' pass placeholder='••••••' />
                                    <BoxInput name='password2' label='Confirme su nueva contraseña' pass placeholder='••••••' />
                                    {(error) && (
                                        <TextError size='medium'>{error}</TextError>
                                    )}
                                    <View style={ styles.buttonsContainer }>
                                        <ButtonSubmit text='Guardar contraseña' onPress={ handleSubmit } style={{width:200}} />
                                    </View>
                                </View>
                            )
                        }
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex:1,
        // paddingHorizontal:40,
        alignItems:'center'
    },
    title: {
        marginVertical:50,
        textAlign:'center'
    },
    subtitle:{
        fontSize:20
    },
    dataUserContainer: {
        marginTop: 20,
        alignItems: 'center',
        height:400,
        justifyContent:'space-between'
    },
    buttonsContainer: {
        marginTop: 30,
        marginBottom:20,
        // height: 100,
        justifyContent: 'space-between',
    }
} );