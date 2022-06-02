import React, { useContext, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanResponder } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { Workout, WorkoutInRoutine, CombinedWorkout } from '../../interfaces/interfaces';
import { RoutinesContext } from '../../context/routines/RoutinesContext';


interface Props {
    workout: Workout;
    idDay: string;
    workoutInRoutine?: WorkoutInRoutine;
    combinedWorkouts?: CombinedWorkout
}

export const CardWorkout = ( { workout, idDay, workoutInRoutine, combinedWorkouts}: Props ) => {

    const { navigate } = useNavigation<any>()
    const { theme: { colors } } = useContext( ThemeContext )
    const {actualCombinedWorkouts} = useContext(RoutinesContext)

    /**
     * Si existe en el estado global un combinedWorkouts actual entonces el nuevo ejercicio elegido
     * va a ser agregado a esta combinacion, sino deja la combinación tal cual como viene 
     * (puede ser con una combinación ya, que sería si ya existe este ejercicio en DB, o vacía)
     */
    const buildToCreateWorkout = ()=>{
        if (actualCombinedWorkouts) {
            combinedWorkouts = {
                ...actualCombinedWorkouts,
                combinedWorkouts: [...actualCombinedWorkouts.combinedWorkouts, {
                    _id: uuid.v4().toString(),
                    tool: 'Mancuerna',
                    workout: workout,
                    sets: [{
                        _id: uuid.v4().toString(),
                        numReps: '',
                        weight: ''
                    }]
                }]
            }
        }

        navigate('CreateWorkoutScreen', { workout, idDay, combinedWorkouts })
    }


    return (
        <TouchableOpacity
            style={ { 
                ...styles.cardContainer, 
                backgroundColor: (workoutInRoutine) 
                    ? colors.primary 
                    : colors.card
            } }
            onPress={ buildToCreateWorkout }
        >  
            <View style={ styles.nameContainer }>
                <Text style={ styles.nameText }>{ workout.name }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create( {
    cardContainer: {
        width: 165,
        height: 100,
        borderRadius: 25,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    editCard:{
        flexDirection:'row',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameContainer: {
        width: 90,
    },
    nameText: {
        textAlign: 'right',
        fontWeight: '500'
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
} );