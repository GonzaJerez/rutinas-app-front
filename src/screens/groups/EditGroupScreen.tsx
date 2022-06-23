import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary } from 'react-native-image-picker';

import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useForm } from '../../hooks/useForm';
import { Group } from '../../interfaces/interfaces';
import { GroupsContext } from '../../context/groups/GroupsContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootSocialNavigator } from '../../router/SocialNavigator';

interface Props extends NativeStackScreenProps<RootSocialNavigator,'EditGroupScreen'>{}

export const EditGroupScreen = ({navigation}:Props) => {

    const { theme } = useContext( ThemeContext )
    const {colors} = theme;
    const {actualGroup,updateGroup} = useContext(GroupsContext)

    // Cuando carga la img del user en vez de agregarla al form la agrego al tempUri
    // En el tempUri (la img que se ve en la pantalla) va a estar la imagen existente del usuario
    // o la imagen elegida de la galeria
    const [ tempUri, setTempUri ] = useState<string>(actualGroup?.img || '')

    // En el form manejo lo q voy a mandar al backend
    const {form, onChange, setFormValue} = useForm({
        img: '',
        name: '',
        description: ''
    })

    useEffect(()=>{
        setFormValue({
            img: actualGroup?.img || '',
            name: actualGroup?.name || '',
            description: actualGroup?.description || ''
        })
    },[actualGroup])

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

    const onSaveGroup = async() => {
        await updateGroup(form)

        navigation.goBack();
    }

    return (
        <ScrollView style={ styles.container }>

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
                        placeholderTextColor={theme.placeholderColor}
                        value={form.name}
                        onChangeText={(value)=>onChange(value,'name')}
                    />
                </View>

                <View style={styles.descriptionContainer}>
                    <TextInput 
                        style={{...styles.descriptionInput,borderColor:theme.disabledColor, color:colors.text}}
                        placeholder='Descripción'
                        placeholderTextColor={theme.placeholderColor}
                        value={form.description}
                        onChangeText={(value)=>onChange(value,'description')}
                        multiline
                        numberOfLines={4}
                    />
                </View>
            </View>

            <View style={ styles.buttonsContainer }>
                <ButtonSubmit text='Guardar' onPress={onSaveGroup} />
                <SecondaryButton text='Cancelar' onPress={ navigation.goBack } />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        // alignItems: 'center',
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
        borderBottomWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        paddingLeft: 10,
        fontSize: 20
    },
    descriptionContainer:{
        // width:'100%'
        marginTop:50
    },
    descriptionInput:{
        width:350,
        height:100,
        borderWidth:1,
        textAlignVertical:'top',
        paddingHorizontal:10,
        borderRadius:10
    },
    buttonsContainer: {
        height: 100,
        justifyContent: 'space-between',
        alignItems:'center'
    }
} );