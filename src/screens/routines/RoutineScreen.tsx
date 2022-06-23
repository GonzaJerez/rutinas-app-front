import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { RootRoutinesNavigator } from '../../router/RoutinesNavigator';
import { GradientBackground } from '../../components/backgrounds/GradientBackground';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { CarouselDayCard } from '../../components/cards/CarouselDaysCard';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { Day } from '../../interfaces/interfaces';

const WIDTHSCREEN = Dimensions.get( 'window' ).width;

interface Props extends NativeStackScreenProps<RootRoutinesNavigator, 'RoutineScreen'> { }

export const RoutineScreen = ( {navigation, route }: Props ) => {

    const {routineCreatorIsActualUser} = route.params;

    const { actualRoutine, deleteDayRoutine, createDayRoutine } = useContext( RoutinesContext )
    const [activeSlide, setActiveSlide] = useState(0)
    const [isEditing, setIsEditing] = useState(false)

    const { theme } = useContext( ThemeContext )
    const { colors } = theme;

    useEffect(()=>{
        navigation.setOptions({title:actualRoutine?.name});
        navigation.setOptions({headerRight:()=>(
            <>
               {(isEditing) && (
                    <TouchableOpacity
                        onPress={()=>setIsEditing(false)}
                    >
                        <Text style={{fontSize:16, color:colors.primary}}>Cancelar</Text>
                    </TouchableOpacity>
                )} 
            </>
        )})
    },[isEditing])

    // Modal para verificar que se quiere eliminar el día de rutina
    const onDeleteDay = (idDay:string, callback:()=>void)=>{
        Alert.alert(
            'Eliminar día de rutina', 
            '¿Seguro deseas eliminar este día? Esta acción no se puede deshacer.',
            [
                {
                    text:'Cancelar',
                    style:'cancel'
                },{
                    text: 'Eliminar',
                    onPress: ()=> {
                        deleteDayRoutine(idDay)
                        callback()
                        setActiveSlide( prev => {
                            if (prev > 0) {
                                return prev - 1
                            } else {
                                return 0
                            }
                        })
                    }
                }
            ],{
                cancelable: true,
            }
        )
    }

    return (
        <View style={ styles.container }>
            <GradientBackground />

            <View style={ styles.cardsContainer }>
                <Carousel
                    data={ actualRoutine?.days || [] }
                    renderItem={ ( { item, index } ) => (
                        <CarouselDayCard
                            numDay={index + 1} 
                            actualDay={item} 
                            onDeleteDay={onDeleteDay}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                        />
                    ) }
                    sliderWidth={ WIDTHSCREEN }
                    itemWidth={ 300 }
                    inactiveSlideOpacity={ 0.9 }
                    onSnapToItem={(index)=>setActiveSlide(index)}
                    keyExtractor={(item)=>item._id}
                />
                <Pagination 
                    dotsLength={actualRoutine?.days.length || 0}
                    activeDotIndex={activeSlide}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: colors.primary
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>

            {
                (activeSlide + 1 === actualRoutine?.days.length )
                && (
                    <SecondaryButton 
                        text='Agregar nuevo día' 
                        onPress={ ()=> createDayRoutine(actualRoutine?._id || '') } 
                    />
                )
            }

            {(actualRoutine?.days[activeSlide].workouts?.length !== 0 && !isEditing)
                && (
                    <ButtonSubmit
                        text={`Comenzar entrenamiento dia ${activeSlide + 1}`}
                        icon='play-circle-outline'
                        onPress={()=>navigation.navigate('TrainingScreen' as any, {
                            dayRoutine: actualRoutine?.days[activeSlide]
                        })}
                        style={{width:330, height:60, position:'absolute', bottom:60, left:(WIDTHSCREEN-330)/2}}
                    />
                )
            }

            <Text style={{...styles.creatorUser, color:theme.disabledColor}}>Creada por {(!routineCreatorIsActualUser) ? actualRoutine?.creatorUser.name : 'ti'}</Text>  
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1
    },
    header:{
        flexDirection:'row',
        width:400, 
        // backgroundColor:'red',
        marginTop:20, 
        justifyContent:'space-between',
        paddingHorizontal:20, 
        alignItems:'center'
    },
    cardsContainer: {
        marginTop: 30,
        marginBottom:10,
        // backgroundColor:'red'
    },
    creatorUser:{
        position:'absolute',
        bottom:5,
        right:10,
        // fontStyle: 'italic'
    }
} );