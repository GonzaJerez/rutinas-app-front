import React, { useContext } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Carousel from 'react-native-snap-carousel';

import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { RootPrivateNavigator } from '../../router/PrivateNavigator';
import { useGetMuscles } from '../../hooks/useGetMuscles';
import { useDayRoutine } from '../../hooks/useDayRoutine';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { CarouselMuscleCard } from '../../components/cards/CarouselMuscleCard';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { CardWorkoutInDay } from '../../components/cards/CardWorkoutInDay';
import { GradientBackground } from '../../components/backgrounds/GradientBackground';
import { Title } from '../../components/headers/Title';


const widthScreen = Dimensions.get( 'window' ).width;
const heightScreen = Dimensions.get( 'window' ).height;


interface Props extends NativeStackScreenProps<RootPrivateNavigator, 'ChooseMuscleScreen'> { }

export const ChooseMuscleScreen = ( { navigation }: Props ) => {

    const {actualRoutine} = useContext(RoutinesContext)

    // Obtiene todos los músculos
    const { muscles } = useGetMuscles()

    // Controla la creación y navegación de los días
    const { onCreateDay, creatingDay, days, onChangeDay } = useDayRoutine(actualRoutine?._id || '')

    const onSubmit = ()=>{
        navigation.goBack()
    }

    return (
        <View style={ styles.container }>
            <GradientBackground />
            <Title text={(!creatingDay) ? `Dia ${days.numActualDay}` : 'Creando día...'} style={ styles.title } />
            <Title text='Elegir músculo' style={ styles.title } />

            <View style={ styles.carouselContainer }>
                <Carousel
                    data={ muscles }
                    renderItem={ ( { item } ) => (
                        <CarouselMuscleCard muscle={ item } idDay={ actualRoutine?.days[Number(days.numActualDay) - 1]?._id || '' } />
                    ) }
                    sliderWidth={ widthScreen }
                    itemWidth={ 300 }
                    inactiveSlideOpacity={ 0.9 }
                />
                <View style={ { height: 30, marginTop: 30 } }>
                    {
                        ( Number( days.numActualDay ) > 1 )
                        && <SecondaryButton
                            text='Día anterior'
                            onPress={ () => onChangeDay( 'prev' ) }
                            style={ { left: 20, position: 'absolute' } }
                        />
                    }
                    {
                        ( Number( days.numActualDay ) < (actualRoutine?.days.length || 1))
                        && <SecondaryButton
                            text='Siguiente día'
                            onPress={ () => onChangeDay( 'next' ) }
                            style={ { right: 20, position: 'absolute' } }
                        />
                    }
                </View>
            </View>

            <View style={ styles.buttonsContainer }>
                {
                    ( Number( days.numActualDay ) === (actualRoutine?.days?.length) && actualRoutine?.days?.length <= 7 )
                    && <SecondaryButton
                        text='Crear nuevo día'
                        onPress={ onCreateDay }
                        style={ { marginBottom: 20 } }
                    />
                }

                <ButtonSubmit
                    text={ `Terminar rutina` }
                    onPress={ onSubmit }
                    style={ { width: 170 } }
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
        height:500,
        marginBottom: 50
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    workoutsCardsContainer: {
        marginVertical: 30
    },
} );