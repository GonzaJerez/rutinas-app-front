import React, { useContext, } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RoutinesContext } from '../context/routines/RoutinesContext';
import { RootPrivateNavigator } from '../router/PrivateNavigator';
import { useGetWorkouts } from '../hooks/useGetWorkouts';
import { CardWorkout } from '../components/CardWorkout';
import { GradientBackground } from '../components/GradientBackground';
import { HeaderTitleBack } from '../components/HeaderTitleBack';
import { ButtonSubmit } from '../components/form/ButtonSubmit';


interface Props extends NativeStackScreenProps<RootPrivateNavigator, 'ChooseWorkoutScreen'> { }

export const ChooseWorkoutScreen = ( { route, navigation }: Props ) => {

    const {idDay, muscle } = route.params
    const {actualRoutine} = useContext(RoutinesContext)
    
    
    const { workouts } = useGetWorkouts( muscle._id )

    return (
        <View style={ styles.container }>
            <GradientBackground />
            <HeaderTitleBack text={`Elegir ejercicio de ${muscle.name.toLowerCase()}`}/>

            <FlatList
                data={ workouts }
                renderItem={ ( { item } ) => (
                    <CardWorkout 
                        workout={item} 
                        idDay={idDay}
                        workoutInRoutine={
                            actualRoutine?.days
                            ?.find(day => day._id?.toString() === idDay)?.workouts
                            ?.find( workout => workout?.workout?._id?.toString() === item?._id?.toString())
                        }
                    />
                ) }
                numColumns={ 2 }
            />

            <ButtonSubmit 
                text='Volver a los músculos' 
                onPress={()=>navigation.goBack()}
                style={{width:250}}
            />
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        paddingHorizontal: 20,
        flex: 1
    },

} );