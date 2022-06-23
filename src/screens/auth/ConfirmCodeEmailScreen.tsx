import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootAuthNavigator } from '../../router/AuthNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Decoration } from '../../components/backgrounds/Decoration';
import { NameApp } from '../../components/headers/NameApp';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { TextError } from '../../components/TextError';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { GoBack } from '../../components/headers/GoBack';
import { AuthContext } from '../../context/auth/AuthContext';
import { RecoverPasswordResponse } from '../../interfaces/interfaces';
import { validateSecurityCodeApi } from '../../helpers/auth/authApis';


interface Props extends NativeStackScreenProps<RootAuthNavigator,'ConfirmCodeEmailScreen'>{}

export const ConfirmCodeEmailScreen = ({route,navigation}:Props) => {

    const {emailUser} = route.params;

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;
    const {setIsWaitingReqLogin} = useContext(AuthContext)

    const [securityCode, setSecurityCode] = useState('')
    const [error, setError] = useState<string>()

    
    const onValidateCode = async()=>{
        if (securityCode.length !== 6) {
            return setError('Código inválido')
        }
        setIsWaitingReqLogin(true)
        try {
            const {msg}:RecoverPasswordResponse = await validateSecurityCodeApi({emailUser,securityCode})
            
            // Si hay error desde el backend
            if (msg) {
                return setError(msg)
            }
            setError(undefined)
            navigation.navigate('UpdatePasswordScreen',{emailUser})

        } catch (err) {
            console.log(err);
            setError('Ocurrió un error, intente nuevamente o comuniquese con el administrador')
        }
        finally{
            setIsWaitingReqLogin(false)
        }
    }

    return (
        <SafeAreaView style={ { ...styles.container, backgroundColor: colors.background } }>
            <Decoration bgColor={colors.primary} />
            <GoBack style={{top:50, left:20}}/>
            <ScrollView>

                <NameApp size='big' style={styles.title}/>

                <View style={styles.formContainer}>
                    <Text style={{...styles.label, color:theme.lightText }}>Ingrese el código de seguridad de 6 dígitos que recibio por mail</Text>
                    <TextInput 
                        placeholder='••••••'
                        placeholderTextColor={theme.placeholderColor}
                        style={{...styles.input, borderColor:colors.primary, color:colors.text}}
                        keyboardType='number-pad'
                        value={securityCode}
                        onChangeText={(value)=>setSecurityCode(value)}
                        maxLength={6}
                    />
                    {(error) && (
                        <TextError size='medium'>{error}</TextError>
                    )}
                </View>
            
                <ButtonSubmit text='Validar código' onPress={onValidateCode} style={styles.buttonValidate}/>
                <View style={ { ...styles.separator, borderColor: theme.dividerColor } } />
                {/* Llama a la misma función del context que llama el "onSendEmail" para enviar el email */}
                <View style={styles.resendContainer}>
                    <Text style={{...styles.label, color:theme.lightText}}>No recibí ningún email</Text>
                    <SecondaryButton text='Reenviar email' onPress={()=>{}}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:40,
        alignItems:'center',
    },
    title:{
        marginVertical:50,
        textAlign:'center',
    },
    formContainer:{
        marginBottom:40,
        alignItems:'center'
    },
    label:{
        fontSize:16,
        // marginTop:40
    },
    input:{
        marginTop:20,
        marginBottom:10,
        borderBottomWidth:1,
        fontSize:30,
        paddingLeft:5,
        width:150,
        alignSelf:'center',
        textAlign:'center',
    },
    buttonValidate:{
        alignSelf:'center', 
        width:150, 
        // marginTop:10
    },
    separator: {
        borderBottomWidth: 1,
        marginVertical: 50,
        width:'100%'
    },
    resendContainer:{
        alignItems:'center',
        // marginTop:50,
        height:50,
        justifyContent:'space-between'
    }
});