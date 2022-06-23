import React, { useContext, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanResponder, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { Workout, WorkoutInRoutine, CombinedWorkout } from '../../interfaces/interfaces';
import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { baseURL } from '../../api/routinesApi';


interface Props {
    workout: Workout;
    idDay: string;
    workoutInRoutine?: WorkoutInRoutine;
    combinedWorkouts?: CombinedWorkout;
    existWorkoutInActualCombined?: boolean;
}

export const CardWorkout = ( { workout, idDay, workoutInRoutine, combinedWorkouts, existWorkoutInActualCombined}: Props ) => {

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
                        weight: '',
                        isDescending: false,
                    }],
                    mode:'Intercalado'
                }]
            }
        }
        
        // Controla el initialSlide para que según sea el músculo que se presiona sea este mismo el que aparezca
        // cuando se renderiza createWorkoutScreen
        let initialSlide:number;
        if (actualCombinedWorkouts?.combinedWorkouts) {
            initialSlide = actualCombinedWorkouts?.combinedWorkouts.length
        } else if(!combinedWorkouts?.combinedWorkouts){
            initialSlide = 0
        } else {
            initialSlide = combinedWorkouts?.combinedWorkouts.findIndex( (work) => work.workout._id === workout._id )
        }
        
        navigate('CreateWorkoutScreen', { workout, idDay, combinedWorkouts, initialSlide })
    }


    return (
        <TouchableOpacity
            style={ { 
                ...styles.cardContainer, 
                // backgroundColor: (workoutInRoutine) 
                //     ? colors.primary 
                //     : colors.card,
                opacity: (existWorkoutInActualCombined)
                    ? 0.5
                    : 1
            } }
            onPress={ buildToCreateWorkout }
            disabled={(existWorkoutInActualCombined)}
        > 
            <Image 
                source={ { uri: `${baseURL}/api/routinesImages/workouts/${workout.img}` } }
                style={styles.image}
                blurRadius={1}
            />
            <View style={styles.darkBackground}/>

            <View style={ styles.nameContainer }>
                <Text style={ {
                    ...styles.nameText,
                    color: (workoutInRoutine) 
                        ? colors.primary 
                        : '#fff',
                } }>{ workout.name }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create( {
    cardContainer: {
        width: 165,
        height: 100,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginHorizontal:10,
        marginVertical:5,
        overflow:'hidden'
    },
    editCard:{
        flexDirection:'row',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameContainer: {
        // width: 90,
        // padding:5
    },
    nameText: {
        textAlign: 'center',
        fontWeight: '500',
        // borderWidth:1,
        borderRadius:12,
        padding: 5,
        color:'#fff',
        borderColor:'#fff',
        // backgroundColor: '#00000060'
    },
    buttons:{
        marginHorizontal: 10,
        borderRadius:5,
        padding:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsText:{
        fontSize:15,
    },
    image:{
        position:'absolute', 
        width:165, 
        height:100, 
        resizeMode:'cover',
        opacity:0.95
    },
    darkBackground:{
        ...StyleSheet.absoluteFillObject,
        position:'absolute', 
        backgroundColor:'#00000099'
    }
} );