import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { CombinedWorkout, Workout, WorkoutInRoutine } from '../../interfaces/interfaces';
import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';

interface Props {
    idDay: string;
    combinedWorkouts: CombinedWorkout
    drag?: () => void
}

export const CardWorkoutInRoutine = ({idDay, drag, combinedWorkouts}:Props) => {

    const {theme:{colors}} = useContext(ThemeContext)
    const {navigate} = useNavigation<any>()

  return (
    <TouchableOpacity
        style={{...styles.container, backgroundColor:colors.card}}
        onLongPress={drag}
        onPress={()=>navigate('CreateWorkoutScreen',{
            idDay,
            combinedWorkouts,
        })}
    >
        <View>
            <Text>Imagen ejercicio</Text>
        </View>
        <View>
            {
                combinedWorkouts.combinedWorkouts.map( work => (
                    
                    <Text key={work._id}>{work.workout.name}</Text>
                ))
            }
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        height: 100,
        width: 350,
        borderRadius: 25,
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:20,
        // marginTop:10,
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
    }
});