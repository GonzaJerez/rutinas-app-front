import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Carousel from 'react-native-snap-carousel';

import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { RootPrivateNavigator } from '../../router/PrivateNavigator';
import { useGetMuscles } from '../../hooks/useGetMuscles';
import { useDayRoutine } from '../../hooks/useDayRoutine';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { CarouselMuscleCard } from '../../components/cards/CarouselMuscleCard';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { GradientBackground } from '../../components/backgrounds/GradientBackground';
import { Title } from '../../components/headers/Title';
import { MusclePlaceholder } from '../../components/placeholders/MusclePlaceholder';
import { ThemeContext } from '../../context/theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';


const widthScreen = Dimensions.get( 'window' ).width;
const heightScreen = Dimensions.get( 'window' ).height;


interface Props extends NativeStackScreenProps<RootPrivateNavigator, 'ChooseMuscleScreen'> { }

export const ChooseMuscleScreen = ( { navigation, route }: Props ) => {

    const [isEditingWorkout, setIsEditingWorkout] = useState(route.params.isEditingWorkout || false)
    const {numDay} = route.params;
    
    const {actualRoutine, actualCombinedWorkouts, clearActualCombinedWorkouts, addNewRoutineToListRoutines} = useContext(RoutinesContext)
    const {theme} = useContext(ThemeContext)

    // Obtiene todos los músculos
    const { muscles, isLoading } = useGetMuscles()

    // Controla la creación y navegación de los días
    const { onCreateDay, creatingDay, days, onChangeDay } = useDayRoutine(actualRoutine?._id || '', numDay)
    
    const onSubmit = ()=>{
        if(!actualRoutine) return;
        if (!isEditingWorkout) {
            addNewRoutineToListRoutines(actualRoutine)
        }
        navigation.goBack()
    }

    // Cuando se cancela una combinacion de ejercicios, vuelve a screen del ejercicio elegido anteriormente
    // (el original que se iba a combinar con otro)
    const onCancel = ()=>{
        if(!actualRoutine || !actualCombinedWorkouts) return;
    
        navigation.navigate('CreateWorkoutScreen',{
        combinedWorkouts: actualCombinedWorkouts,
        idDay: actualRoutine?.days[Number(days.numActualDay) - 1]?._id,
        workout: actualCombinedWorkouts?.combinedWorkouts[0].workout,
        initialSlide: actualCombinedWorkouts?.combinedWorkouts.length - 1
        })
        
        clearActualCombinedWorkouts()
    }

    // Maneja el header dependiendo de si se esta creando, actualizando o combinando ejercicios
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            // headerBackVisible: !isEditingWorkout,
            headerBackVisible: false,
            title: (isEditingWorkout && actualCombinedWorkouts)
                        ? '  Combinando ejercicio'
                        : (isEditingWorkout && !actualCombinedWorkouts)
                            ? '  Agregando ejercicio'
                            : (!creatingDay) 
                                ? `Dia ${days.numActualDay}` 
                                : 'Creando día...',
            headerRight:()=>(
                <>
                    {(actualCombinedWorkouts) && (
                        <TouchableOpacity
                            onPress={onCancel} 
                        >
                            <Text style={{color:theme.colors.primary}}>Cancelar</Text>
                        </TouchableOpacity>
                    )}
                </>
            )
        })
    },[creatingDay, days, isEditingWorkout, actualCombinedWorkouts])

    return (
        <View style={ styles.container }>
            <GradientBackground />

            <SecondaryButton
                text='Crear nuevo día'
                onPress={ onCreateDay }
                style={ { alignSelf:'flex-end', marginRight:20, marginTop:10} }
                disabled={!(( Number( days.numActualDay ) === (actualRoutine?.days?.length)) && (actualRoutine?.days?.length <= 7) && !isEditingWorkout )}
            />
            
            <Title text='Elegir músculo' style={ styles.title } />

            <View style={ styles.carouselContainer }>
                {(isLoading) 
                    ? (<MusclePlaceholder />)
                    : (
                        <Carousel
                            data={ muscles }
                            renderItem={ ( { item } ) => (
                                <CarouselMuscleCard muscle={ item } idDay={ actualRoutine?.days[Number(days.numActualDay) - 1]?._id || '' } />
                            ) }
                            sliderWidth={ widthScreen }
                            itemWidth={ 300 }
                            inactiveSlideOpacity={ 0.9 }
                        />
                    )
                }
                {!isEditingWorkout && (
                    <View style={ { height: 30, marginTop: 30 } }>
                        {
                            ( Number( days.numActualDay ) > 1 ) && (
                                <TouchableOpacity
                                    onPress={() => onChangeDay( 'prev' )}
                                    style={ { left: 20, position: 'absolute', flexDirection:'row', alignItems:'center'} }
                                >
                                    <Icon 
                                        name='chevron-back-outline'
                                        size={20}
                                        color={theme.colors.primary}
                                    />
                                    <Text style={{color:theme.colors.primary}}>Día anterior</Text>
                                </TouchableOpacity>
                            )
                        }
                        {
                            ( Number( days.numActualDay ) < (actualRoutine?.days.length || 1)) && (
                                <TouchableOpacity
                                    onPress={() => onChangeDay( 'next' )}
                                    style={ { right: 20, position: 'absolute', flexDirection:'row', alignItems:'center'} }
                                >
                                    <Text style={{color:theme.colors.primary}}>Siguiente día</Text>
                                    <Icon 
                                        name='chevron-forward-outline'
                                        size={20}
                                        color={theme.colors.primary}
                                    />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                )}
            </View>

            <View style={ styles.buttonsContainer }>
                <ButtonSubmit
                    text={ 'Terminar' }
                    onPress={ onSubmit }
                    style={ { width: 140 } }
                />
            </View>

            <View style={ styles.workoutsCardsContainer }>
                {/* <FlatList
                    data={ workoutsInDay }
                    renderItem={ ( { item } ) => (
                        <CardWorkoutInDay workout={ item } />
                    ) }
                    horizontal={ true }
                /> */}

            </View>

        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        height: heightScreen
    },
    title: {
        paddingLeft: 30,
        paddingTop: 30
    },
    carouselContainer: {
        height:520,
        // marginBottom: 50,
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20
    },
    workoutsCardsContainer: {
        marginVertical: 30
    },
} );