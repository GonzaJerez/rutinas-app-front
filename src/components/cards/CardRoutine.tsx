import React, { useContext } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../../context/theme/ThemeContext'
import { RoutinesContext } from '../../context/routines/RoutinesContext';
import {  Routine } from '../../interfaces/interfaces'

const widthScreen = Dimensions.get('window').width

interface Props {
    routine: Routine;
    isEditing?: string;
    setEditing?: (value: React.SetStateAction<string>) => void;
}

export const CardRoutine = ( { routine, setEditing, isEditing,  }: Props ) => {

    const { theme } = useContext( ThemeContext )
    const {setActualRoutine} = useContext(RoutinesContext)
    const {navigate} = useNavigation<any>()

    const toRoutine = ()=>{
        setActualRoutine(routine)
        navigate('RoutineScreen')
    }

    return (
        <TouchableOpacity 
            style={ { 
                ...styles.cardRoutine, 
                borderColor:theme.dividerColor, 
                backgroundColor:theme.colors.card,
            } }
            onPress={(isEditing === routine._id) ? ()=>{} : toRoutine}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../../assets/gym1.png')}
                    style={styles.cardImage}
                />
            </View>

            <View style={styles.dataRoutine}>
                <Text style={ {...styles.titleRoutine, color:theme.colors.primary} }>{ routine.name }</Text>
                <Text style={ {...styles.daysRoutine} }>Dias: { routine.days.length }</Text>
            </View>

            {/* {
                (isEditing === routine._id)
                    && <CardRoutineEditing setEditing={setEditing} routine={routine} />
            } */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create( {
    cardRoutine: {
        overflow:'visible',
        alignItems: 'center',
        borderRadius: 25,
        flexDirection: 'row',
        width: widthScreen - 50,
        height: 180,
        justifyContent: 'flex-end',
        marginBottom:10,
        // marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal:30,
        // zIndex: 999,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
    },
    imageContainer:{
        position: 'absolute'
    },
    cardImage:{
        width: 270,
        height: 100,
        left: -110
    },
    dataRoutine:{
        height:110
    },
    titleRoutine: {
        fontSize: 20
    },
    daysRoutine: {
        position: 'absolute',
        bottom: 15,
        right: 15
    },
} );