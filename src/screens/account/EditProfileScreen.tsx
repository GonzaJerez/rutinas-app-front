import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {launchImageLibrary } from 'react-native-image-picker';

import { ThemeContext } from '../../context/theme/ThemeContext'
import { HeaderTitleBack } from '../../components/headers/HeaderTitleBack'
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit'
import { SecondaryButton } from '../../components/buttons/SecondaryButton'
import { AuthContext } from '../../context/auth/AuthContext'
import { useForm } from '../../hooks/useForm';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootAccountNavigator } from '../../router/AccountNavigator';
import { ScrollView } from 'react-native-gesture-handler';

// interface Props extends NativeStackScreenProps<RootAccountNavigator,'EditProfileScreen'>{}

export const EditProfileScreen = () => {

    const { theme } = useContext( ThemeContext )
    const { colors } = theme;
    const {user, updateProfileUser} = useContext(AuthContext)
    const {goBack} = useNavigation<any>()

    // Cuando carga la img del user en vez de agregarla al form la agrego al tempUri
    // En el tempUri (la img que se ve en la pantalla) va a estar la imagen existente del usuario
    // o la imagen elegida de la galeria
    const [ tempUri, setTempUri ] = useState<string>(user?.img || '')

    // En el form manejo lo q voy a mandar al backend
    const {form, onChange, setFormValue} = useForm({
        img: '',
        name: ''
    })
    
    useEffect(()=>{
        if (!user) return;
        setFormValue({
            img: user.img || '',
            name: user.name
        })
    },[user])

    const takePhotoFromGalery = () => {
        launchImageLibrary( {
            mediaType: 'photo',
            quality: 0.5
        }, ( resp ) => {
            if ( resp.didCancel ) return;
            if ( !resp.assets ) return;
            if ( !resp.assets[0].uri ) return;
            // Cuando cargo una img la agrego al tempUri y al form cargo toda la estructura de data de esa img
            setTempUri( resp.assets[ 0 ].uri )
            onChange(resp.assets[ 0 ], 'img')
        } )
    }

    const onSaveProfile = async() => {
        await updateProfileUser(form)

        goBack();
    }

    return (
        <ScrollView>
            <View style={ styles.container }>

                <View style={ styles.dataUserContainer }>
                    <TouchableOpacity 
                        style={ styles.imageContainer }
                        onPress={takePhotoFromGalery}
                    >
                        <Image 
                            source={(tempUri) ? {uri:tempUri} : require('../../assets/user-not-img.png')}
                            style={{...styles.image, borderColor:colors.primary}}
                        />

                        <View style={ { ...styles.updateImage, backgroundColor: colors.primary } }>
                            <Icon
                                name='add-outline'
                                size={ 30 }
                                color={ colors.background }
                                style={ { right: -1 } }
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={ styles.nameContainer }>
                        <TextInput
                            style={ { ...styles.textInput, borderColor: colors.primary, color:colors.text } }
                            placeholder='Nombre usuario'
                            value={form.name}
                            onChangeText={(value)=>onChange(value,'name')}
                        />
                    </View>
                </View>

                <View style={ styles.buttonsContainer }>
                    <ButtonSubmit text='Guardar' onPress={onSaveProfile} />
                    <SecondaryButton text='Cancelar' onPress={ goBack } />
                </View>
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
        marginTop: 80,
        alignItems: 'center',
        marginBottom: 80
    },
    imageContainer: {
        // borderWidth: 1,
        width: 200,
        height: 200,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width:200,
        height:200,
        borderRadius:100,
        borderWidth:2
    },
    updateImage: {
        position: 'absolute',
        borderRadius: 8,
        bottom: 10,
        right: 20
    },
    nameContainer: {
        marginTop: 30,
        width: 350
    },
    textInput: {
        // borderWidth:1,
        borderBottomWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        paddingLeft: 10,
        fontSize: 20
    },
    buttonsContainer: {
        height: 100,
        justifyContent: 'space-between',
        marginBottom:40
    }
} );