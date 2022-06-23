import React, { LegacyRef, useContext, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { RootPrivateNavigator } from '../../router/PrivateNavigator';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { TextError } from '../../components/TextError';
import { useWorkoutInRoutine } from '../../hooks/useWorkoutInRoutine';
import { GradientBackground } from '../../components/backgrounds/GradientBackground';
import { WorkoutFormCard } from '../../components/cards/WorkoutFormCard';
import { ScreenEmpty } from '../../components/ScreenEmpty';
import { WorkoutInRoutine } from '../../interfaces/interfaces';


interface Props extends NativeStackScreenProps<RootPrivateNavigator, 'CreateWorkoutScreen'> { }

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;


export const CreateWorkoutScreen = ( { route, navigation }: Props ) => {

    const {idDay, workout, combinedWorkouts, initialSlide} = route.params;
    
    const [activeSlide, setActiveSlide] = useState(initialSlide || 0)
    const [isEditing, setIsEditing] = useState(false)
    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    const {
        state,
        error,
        changeWorkout,
        deleteWorkout,
        addSet,
        changeSet,
        deleteSet,
        onSaveWorkout
    } = useWorkoutInRoutine(workout || combinedWorkouts?.combinedWorkouts[0]?.workout, combinedWorkouts, idDay)
    
    
    // HEADER NAVIGATOR
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            title: (!combinedWorkouts) 
                ? 'Añadir ejercicio'
                : (combinedWorkouts.combinedWorkouts.length > 1)
                    ? 'Ejercicio combinado'
                    : 'Actualizar ejercicio',
            headerRight: ()=>(
                <>
                    {(!isEditing)
                        ? (
                            <TouchableOpacity
                                onPress={()=>onSaveWorkout()}
                            >
                                <Text style={{color:theme.colors.primary}}>Guardar</Text>
                            </TouchableOpacity>
                        )
                        : (
                            <TouchableOpacity
                                onPress={()=>setIsEditing(false)}
                            >
                                <Text style={{color:theme.colors.primary}}>Cancelar</Text>
                            </TouchableOpacity>
                        )
                    }
                </>
            )
        })
    },[isEditing,state])

    useEffect(()=>{
        if (state.combinedWorkouts.length === 0) {
            setIsEditing(false)
        }
    }, [state])
    

    return (
        <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            keyboardVerticalOffset={170}
            style={{flex:1}}
        >
            <ScrollView>
                <GradientBackground />
                <View style={ styles.container }>

                    {(error !== '') && (
                        <TextError size='medium'>{error}</TextError>
                    )}

                    {(state.combinedWorkouts.length === 0) && (
                        <ScreenEmpty text={'Eliminaste todos los ejercicios combinados \nPresiona "Guardar" para guardar los cambios'}/>
                    )}

                    <Pagination 
                        dotsLength={state.combinedWorkouts.length}
                        activeDotIndex={activeSlide}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: colors.primary,
                        }}
                        containerStyle={{paddingTop:10, paddingBottom:10}}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                    <Carousel 
                        data={state.combinedWorkouts}
                        renderItem={({item,index})=>(
                            <WorkoutFormCard 
                                item={item} 
                                index={index}
                                state={state}
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                                changeWorkout={changeWorkout}
                                deleteWorkout={deleteWorkout}
                                addSet={addSet}
                                changeSet={changeSet}
                                deleteSet={deleteSet}
                            />
                        )}
                        keyExtractor={(item)=>(item._id.toString())}
                        sliderWidth={widthScreen}
                        itemWidth={widthScreen}
                        onSnapToItem={(index)=>setActiveSlide(index)}
                        firstItem={initialSlide}
                        contentContainerCustomStyle={{
                            minWidth: widthScreen * (combinedWorkouts?.combinedWorkouts.length || state.combinedWorkouts.length),
                        }}
                    />
                
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:10
    },
} );