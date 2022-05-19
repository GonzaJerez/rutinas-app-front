import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, StyleProp, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'

import { RoutinesContext } from '../context/routines/RoutinesContext';
import { ThemeContext } from '../context/theme/ThemeContext'
import { Routine } from '../interfaces/interfaces';

interface Props{
    setEditing: (value: React.SetStateAction<string>) => void,
    routine: Routine,
    // style?: StyleProp<ViewStyle>
}

export const CardRoutineEditing = ({setEditing, routine}:Props) => {

    const {navigate} = useNavigation<any>()

    const {theme} = useContext(ThemeContext)
    const {setActualRoutine, deleteRoutine} = useContext(RoutinesContext)
    const {colors} = theme;


    // Modal para verificar que se quiere eliminar la rutina
    const onDeleteRoutine = ()=>{
        Alert.alert(
            'Eliminar rutina', 
            '¿Seguro deseas eliminarla? Esta acción no se puede deshacer.',
            [
                {
                    text:'Cancelar',
                    style:'cancel'
                },{
                    text: 'Eliminar',
                    onPress: ()=> deleteRoutine(routine._id)
                }
            ],{
                cancelable: true,
            }
        )
    }

    const toEditRoutine = ()=>{
        setEditing('')
        setActualRoutine(routine)
        navigate('EditRoutineScreen')
    }

  return (
    <View style={{...styles.card, ...StyleSheet.absoluteFillObject, backgroundColor:colors.card}}>

        <View style={styles.buttonsContainer}>

            <TouchableOpacity
                style={styles.buttons}
                onPress={toEditRoutine}
            >
                <Icon name='color-wand-outline' size={30} color={colors.text}/>
                <Text style={{...styles.buttonsText, color:colors.text}}>Editar</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.buttons}
            >
                <Icon name='copy-outline' size={30} color={colors.text}/>
                <Text style={{...styles.buttonsText, color:colors.text}}>Crear copia</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttons}
            >
                <Icon name='share-outline' size={30} color={colors.text}/>
                <Text style={{...styles.buttonsText, color:colors.text}}>Enviar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttons}
                onPress={onDeleteRoutine}
            >
                <Icon name='trash-outline' size={30} color={colors.text}/>
                <Text style={{...styles.buttonsText, color:colors.text}}>Eliminar</Text>
            </TouchableOpacity>
        </View>

        <View style={{...styles.buttonsContainer, marginTop: 30}}>
            <TouchableOpacity
                onPress={()=>setEditing('')}
            >
                <Text style={{...styles.buttonsText, color:colors.text}}>Cancelar</Text>
            </TouchableOpacity>
        </View>

    </View>

  )
}

const styles = StyleSheet.create({
    card:{
        position: 'absolute',
        opacity: 0.9,
        borderRadius: 25,
        justifyContent:'center',
        alignContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
        zIndex: 9999
    },
    buttonsContainer:{
        flexDirection: 'row',
        // backgroundColor:'red',
        justifyContent: 'center',
    },
    buttons:{
        marginHorizontal: 10,
        borderRadius:5,
        padding:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsText:{
        fontSize:16,
    }
});