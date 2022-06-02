import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { GradientBackground } from '../../components/backgrounds/GradientBackground';
import { HeaderTitleBack } from '../../components/headers/HeaderTitleBack';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { Swipeable } from 'react-native-gesture-handler';
import { RightSwipe } from '../../components/swipers/RightSwipe';
import { RootRoutinesNavigator } from '../../router/RoutinesNavigator';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { CarouselDayCard } from '../../components/cards/CarouselDaysCard';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';

const widthScreen = Dimensions.get( 'window' ).width;

interface Props extends NativeStackScreenProps<RootRoutinesNavigator, 'RoutineScreen'> { }

export const RoutineScreen = ( {navigation }: Props ) => {

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
                        <Text style={{fontSize:16}}>Cancelar</Text>
                    </TouchableOpacity>
                )} 
            </>
        )})
    })

    // Modal para verificar que se quiere eliminar el día de rutina
    const onDeleteDay = (idDay:string)=>{
        Alert.alert(
            'Eliminar día de rutina', 
            '¿Seguro deseas eliminar este día? Esta acción no se puede deshacer.',
            [
                {
                    text:'Cancelar',
                    style:'cancel'
                },{
                    text: 'Eliminar',
                    onPress: ()=> deleteDayRoutine(idDay)
                }
            ],{
                cancelable: true,
            }
        )
    }


    return (
        <View style={ styles.container }>
            <GradientBackground />
            {/* <View style={styles.header}>
                <HeaderTitleBack text={ actualRoutine?.name || '' } />
                {(isEditing) && (
                    <TouchableOpacity
                        style={{marginTop:20}}
                        onPress={()=>setIsEditing(false)}
                    >
                        <Text style={{fontSize:16}}>Cancelar</Text>
                    </TouchableOpacity>
                )}
            </View> */}
                    
                            
                    

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
                    sliderWidth={ widthScreen }
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
                        // marginHorizontal: 8,
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

            {(actualRoutine?.days[activeSlide].workouts?.length !== 0)
                && (
                    <ButtonSubmit
                        text={`Comenzar entrenamiento dia ${activeSlide + 1}`}
                        icon='play-circle-outline'
                        onPress={()=>navigation.navigate('TrainingScreen' as any, {
                            dayRoutine: actualRoutine?.days[activeSlide]
                        })}
                        style={{width:350, height:70, position:'absolute', bottom:20, left:(widthScreen-350)/2}}
                    />
                )
            }
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
        paddingHorizontal: 20,
        marginBottom:50
    },
} );