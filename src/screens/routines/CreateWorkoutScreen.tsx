import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';

import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { RootPrivateNavigator } from '../../router/PrivateNavigator';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { TextError } from '../../components/TextError';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { useWorkoutInRoutine } from '../../hooks/useWorkoutInRoutine';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { HeaderTitleBack } from '../../components/headers/HeaderTitleBack';
import { GradientBackground } from '../../components/backgrounds/GradientBackground';
import { CombinedWorkout, WorkoutInRoutine } from '../../interfaces/interfaces';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { GoBack } from '../../components/headers/GoBack';
import Icon from 'react-native-vector-icons/Ionicons';
import { WorkoutFormCard } from '../../components/cards/WorkoutFormCard';

interface Props extends NativeStackScreenProps<RootPrivateNavigator, 'CreateWorkoutScreen'> { }

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;


export const CreateWorkoutScreen = ( { route, navigation }: Props ) => {

    const {idDay, workout, combinedWorkouts} = route.params;
    const [activeSlide, setActiveSlide] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
    
    const {
        createCombinedWorkouts, 
        updateCombinedWorkouts, 
        clearActualCombinedWorkouts
    } = useContext(RoutinesContext)

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;


    const {
        state,
        setCombinedWorkouts,
        // addWorkout,
        changeWorkout,
        deleteWorkout,
        addSet,
        changeSet,
        deleteSet
    } = useWorkoutInRoutine(workout || combinedWorkouts?.combinedWorkouts[0]?.workout)
    

    /**
     * combiendWorkouts es el ejercicio combinado actual en DB, si no existe quiere decir que no existe este ejercicio
     * en DB asi que no hay nada que cargar.
     * Si sí existe en DB entonces carga la info de ese ejercicio en el state
     */
    useEffect(()=>{
        if(!combinedWorkouts) return;

        setCombinedWorkouts(combinedWorkouts)
    },[combinedWorkouts])
    

    /**
     * Si el estado tiene id significa que viene de la DB, por lo tanto al presionar en guardar se actualiza
     * Si no tiene id es poque se está creando uno nuevo entonces al presionar guardar lo crea en DB
     */
    const onSaveWorkout = async ()=>{
        if (!state._id) {
            await createCombinedWorkouts(idDay,state)
        } else {
            await updateCombinedWorkouts(idDay, combinedWorkouts._id || '', state)
        }

        clearActualCombinedWorkouts()
        navigation.goBack();
    }


    return (
        <View style={ styles.container }>
            <GradientBackground />

                <View style={styles.header}>
                    <GoBack />
                    {
                        (!isEditing)
                            ? (
                                <TouchableOpacity
                                    onPress={onSaveWorkout}
                                >
                                    <Text style={{fontSize:16}}>Guardar</Text>
                                </TouchableOpacity>
                            )
                            : (
                                <TouchableOpacity
                                    onPress={()=>setIsEditing(false)}
                                >
                                    <Text style={{fontSize:16}}>Cancelar</Text>
                                </TouchableOpacity>
                            )
                    }
                    
                </View>

                <Pagination 
                    dotsLength={state.combinedWorkouts.length}
                    activeDotIndex={activeSlide}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: colors.primary,
                    }}
                    containerStyle={{paddingTop:5, paddingBottom:5, marginBottom:-20}}
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
                    itemWidth={380}
                    onSnapToItem={(index)=>setActiveSlide(index)}
                />
                

        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        height: heightScreen,
        alignItems:'center',
        justifyContent:'center',
    },
    header:{
        flexDirection:'row',
        width:400, 
        marginTop:40, 
        justifyContent:'space-between', 
        paddingHorizontal:20, 
        alignItems:'center'
    },
} );