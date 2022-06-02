import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WorkoutInRoutine } from '../../interfaces/interfaces'

interface Props {
    workout: WorkoutInRoutine
}

export const CardWorkoutInDay = ({workout:{workout,sets, tool}}:Props) => {
    return (
        <View style={ styles.workoutCard }>
            <Text>{ workout.name }</Text>
            <Text>{ tool }</Text>
            <View style={ { flexDirection: 'row' } }>
                <Text>{ sets.length } x </Text>
                {
                    sets.map( ( set, index ) => (
                        <Text key={ index }>{ set.numReps } - </Text>
                    ) )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    workoutCard: {
        width: 120,
        height: 80,
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: 20,
    }
});