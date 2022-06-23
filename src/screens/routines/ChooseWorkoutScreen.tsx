import React, { useContext, useEffect, } from 'react'
import { View, StyleSheet, FlatList, Dimensions } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { RootPrivateNavigator } from '../../router/PrivateNavigator';
import { useGetWorkouts } from '../../hooks/useGetWorkouts';
import { CardWorkout } from '../../components/cards/CardWorkout';
import { GradientBackground } from '../../components/backgrounds/GradientBackground';


interface Props extends NativeStackScreenProps<RootPrivateNavigator, 'ChooseWorkoutScreen'> { }

export const ChooseWorkoutScreen = ( { route, navigation }: Props ) => {

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            title: muscle.name,
        })
    },[])

    const {idDay, muscle } = route.params
    const {actualRoutine, actualCombinedWorkouts} = useContext(RoutinesContext)
    
    const { workouts } = useGetWorkouts( muscle._id )

    return (
        <View style={ styles.container }>
            <GradientBackground />

            <View style={styles.listContainer}>
                <FlatList
                    data={ workouts }
                    renderItem={ ( { item } ) => (
                        <CardWorkout 
                            workout={item} 
                            idDay={idDay}
                            combinedWorkouts={
                                actualRoutine?.
                                days?.find(day => day._id?.toString() === idDay)?.
                                workouts?.find( workout => (
                                    workout.combinedWorkouts.find( work => work.workout?._id?.toString() === item._id?.toString())
                                ))
                            }
                            workoutInRoutine={
                                actualRoutine?.
                                days?.find(day => day._id?.toString() === idDay)?.
                                workouts?.find( workout => (
                                    workout.combinedWorkouts.find( work => work.workout?._id?.toString() === item._id?.toString())
                                ))?.combinedWorkouts.find( work => work.workout?._id?.toString() === item._id?.toString())
                            }
                            existWorkoutInActualCombined={
                                actualCombinedWorkouts?.combinedWorkouts.find( workout => workout.workout._id === item._id) ? true : false
                            }
                        />
                    ) }
                    ListHeaderComponent={()=>(<View style={{height:20}}/>)}
                    ListFooterComponent={()=>(<View style={{height:20}}/>)}
                    numColumns={ 2 }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        // paddingHorizontal: 20,
        flex: 1
    },
    listContainer:{
        alignItems:'center',
    }
} );