import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { NameApp } from '../../components/headers/NameApp';
import { Decoration } from '../../components/backgrounds/Decoration';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootAuthNavigator } from '../../router/AuthNavigator';
import { TextError } from '../../components/TextError';
import { GoBack } from '../../components/headers/GoBack';
import { RecoverPasswordResponse } from '../../interfaces/interfaces';
import { sendEmailToRecoverPasswordApi } from '../../helpers/auth/authApis';
import { AuthContext } from '../../context/auth/AuthContext';

interface Props extends NativeStackScreenProps<RootAuthNavigator,'ForgotPasswordScreen'>{}

export const ForgotPasswordScreen = ({navigation}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;
    const {setIsWaitingReqLogin} = useContext(AuthContext)

    const [emailUser, setEmailUser] = useState('')
    const [error, setError] = useState<string>()

    const onSendEmail = async()=>{
        // Valida que email no esté vacío
        if (emailUser === '') {
            return setError(`Se necesita un email para recuperar la contraseña`)
        }

        // Valida que el "emailUser" sea un email
        const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if(!emailUser.toLowerCase().match(regex)){
            return setError(`El email ${emailUser} no es válido`)
        }

        setIsWaitingReqLogin(true)
        try {
            // Enviar email
            const {msg}:RecoverPasswordResponse = await sendEmailToRecoverPasswordApi({emailUser})
    
            if (msg) {
                return setError(msg)
            }
    
            setError(undefined)
            navigation.navigate('ConfirmCodeEmailScreen',{emailUser})

        } catch (err:any) {
            setError(err)
        }
        finally{
            setIsWaitingReqLogin(false)
        }

    }

    return (
        <SafeAreaView style={ { ...styles.container, backgroundColor: colors.background } }>
            <GoBack style={{top:50, left:20}}/>
            <Decoration bgColor={colors.primary} />
            <ScrollView>

                <NameApp size='big' style={styles.title}/>

                <View style={styles.formContainer}>
                    <Text style={{...styles.label, color:theme.lightText }}>Ingrese su email para recuperar su contraseña</Text>
                    <TextInput 
                        placeholder='email@gmail.com'
                        placeholderTextColor={theme.placeholderColor}
                        style={{...styles.input, borderColor:colors.primary, color:colors.text}}
                        keyboardType='email-address'
                        value={emailUser}
                        onChangeText={(value)=>setEmailUser(value)}
                    />
                    {(error) && (
                        <TextError size='medium'>{error}</TextError>
                    )}
                    <Text style={{...styles.textInfo,color:theme.disabledColor}}>Se enviará un código de recuperación a su email para validar el usuario</Text>
                </View>
            
                <ButtonSubmit text='Enviar' onPress={onSendEmail} style={{alignSelf:'center'}}/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:40,
        alignItems:'center'
    },
    title:{
        marginVertical:50,
        textAlign:'center'
    },
    formContainer:{
        marginBottom:40
    },
    label:{
        fontSize:16,
        marginTop:40
    },
    input:{
        marginTop:20,
        borderBottomWidth:1,
        fontSize:16,
        paddingLeft:5
    },
    textInfo:{
        marginTop:30
    }
});