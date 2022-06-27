import React, { useContext } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../../context/theme/ThemeContext'
import { RoutinesContext } from '../../context/routines/RoutinesContext';
import {  Routine } from '../../interfaces/interfaces'
import { AuthContext } from '../../context/auth/AuthContext';
import { baseURL } from '../../api/routinesApi';

const WIDTHSCREEN = Dimensions.get('window').width

interface Props {
    routine: Routine;
}

export const CardRoutine = ( { routine }: Props ) => {

    const { theme } = useContext( ThemeContext )
    const {setActualRoutine} = useContext(RoutinesContext)
    const {user} = useContext(AuthContext)
    const {navigate} = useNavigation<any>()

    const routineCreatorIsActualUser = routine.creatorUser._id === user?._id

    const toRoutine = ()=>{
        setActualRoutine(routine)
        navigate('RoutineScreen',{routineCreatorIsActualUser})
    }

    return (
        <TouchableOpacity 
            style={ { 
                ...styles.cardRoutine, 
                borderColor:theme.dividerColor, 
                backgroundColor:theme.colors.card,
            } }
            onPress={toRoutine}
            activeOpacity={0.95}
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: `${baseURL}/api/routinesImages/routines/${routine.img}` }}
                    style={styles.cardImage}
                />
            </View>

            <View style={styles.dataRoutine}>
                <Text 
                    style={ {...styles.titleRoutine, color:theme.colors.primary} }
                    adjustsFontSizeToFit
                    numberOfLines={2}
                >
                    { routine.name }
                </Text>
                <Text style={{color:theme.lightText}}>Dias: { routine.days.length }</Text>
                {(!routineCreatorIsActualUser && routine.creatorUser.name) && (<Text style={{color:theme.disabledColor}}>{`Creado por ${routine.creatorUser.name}`}</Text>)}
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create( {
    cardRoutine: {
        overflow:'visible',
        alignItems: 'center',
        borderRadius: 25,
        flexDirection: 'row',
        width: WIDTHSCREEN - 50,
        height: 180,
        justifyContent: 'flex-end',
        marginBottom:15,
        marginHorizontal:( WIDTHSCREEN - (WIDTHSCREEN - 50)) / 2,
        paddingHorizontal:30,
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
        position: 'absolute',
        zIndex:1,
        left: -5,
        bottom: -5,
    },
    cardImage:{
        width: 180,
        height: 180,
        resizeMode:'contain',
    },
    dataRoutine:{
        height:150,
        marginTop:10,
        justifyContent:'space-around',
        alignItems:'flex-end'
    },
    titleRoutine: {
        fontSize: 20,
        fontWeight:'500',
        maxWidth:140,
        maxHeight:60
    },
} );