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

export const EditProfile = () => {

    const { theme } = useContext( ThemeContext )
    const {user, updateUser} = useContext(AuthContext)
    const { colors } = theme;
    const {goBack} = useNavigation<any>()

    const {form, onChange, setFormValue} = useForm({
        img: {uri:''},
        name: ''
    })
    
    useEffect(()=>{
        if (!user) return;
        setFormValue({
            img: {uri: user.img || ''},
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
            onChange({uri:resp.assets[ 0 ].uri}, 'img')
        } )
    }

    const onSaveProfile = async() => {
        await updateUser({
            name: form.name,
            img: form.img.uri
        })

        goBack();
    }

    return (
        <View style={ styles.container }>
            <View style={styles.title}>
                <HeaderTitleBack text='Editar perfil' />
            </View>

            <View style={ styles.dataUserContainer }>
                <TouchableOpacity 
                    style={ styles.imageContainer }
                    onPress={takePhotoFromGalery}
                >
                    <Image 
                        source={(form.img.uri !== '') ? form.img : require('../../assets/user-not-img.png')}
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
                        style={ { ...styles.textInput, borderColor: colors.primary } }
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
    }
} );