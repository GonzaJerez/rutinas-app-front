import React, { useContext, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootSocialNavigator } from '../../router/SocialNavigator';
import { CombinedWorkout } from '../../interfaces/interfaces';
import { GradientBackground } from '../../components/backgrounds/GradientBackground';
import { ThemeContext } from '../../context/theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { RootRoutinesNavigator } from '../../router/RoutinesNavigator';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { ScreenEmpty } from '../../components/ScreenEmpty';
import { calculate1RM } from '../../helpers/calculate1RM';

const SCREENWIDTH = Dimensions.get('window').width

interface Props extends NativeStackScreenProps<RootRoutinesNavigator, 'DayRoutineScreen'> { }

export const DayRoutineScreen = ( { route, navigation }: Props ) => {

    const { numDay, day, typeUnit, timer, isMovement } = route.params
    
    const {theme} = useContext(ThemeContext)
    const {setActualCombinedWorkouts, actualRoutine, updateDayRoutine} = useContext(RoutinesContext)

    const time = new Date(timer);
    const minutes = time.getMinutes().toString().padStart(2,'0');
    const seconds = time.getSeconds().toString().padStart(2,'0');
    const formattedTime = `${minutes}:${seconds}`

    useEffect( () => {
        navigation.setOptions( {
            title: `Día ${numDay}`
        } )
    }, [] )
    
    /**
     * Agarra el ejercicio combinado actual y lo almacena en estado global
     * En "cardWorkout" cuando se elije otro ejercicio existiendo ya en el estado global
     * un ejercicio combinado lo agrega a este, sino deja el combinedWorkout como estaba
     */
     const addOtherWorkout = (combinedWorkout:CombinedWorkout)=>{
        setActualCombinedWorkouts(combinedWorkout)
        navigation.navigate('ChooseMuscleScreen' as any, {
            isEditingWorkout: true
        })
    }

    const renderItem = ( { item, drag }: RenderItemParams<CombinedWorkout> ) => {
        return (
            <ScaleDecorator>
                <View style={{...styles.combinedContainer}}>
                    {
                        item.combinedWorkouts.map( (work, index) => (
                            <TouchableOpacity
                                onPress={()=>navigation.navigate('CreateWorkoutScreen' as any,{
                                    idDay: day._id,
                                    workout: work.workout,
                                    combinedWorkouts: item,
                                    initialSlide: index
                                })}
                                onLongPress={drag}
                                style={{...styles.workoutContainer, backgroundColor: theme.colors.card}}
                                key={work._id}
                            >
                                <Text style={{...styles.workoutName, color:theme.colors.primary}}>
                                    {work.workout.name}
                                </Text>
                                <Text style={{...styles.subtitle, color:theme.colors.text}}>{work.tool}</Text>
                                <Text style={{...styles.label, color:theme.lightText}}>{work.mode}</Text>
                                <Text style={{...styles.maxWeight, color:theme.lightText}}>{`1RM : ${calculate1RM(work.sets)} ${typeUnit}`}</Text>
                                <View>
                                    {
                                        work.sets.map( set => (
                                            <View key={set._id} style={{alignItems:'center'}}>
                                                <Text style={{...styles.label, color:theme.lightText}}>
                                                    {set.numReps} repes {(set.weight) && `con ${set.weight} ${typeUnit}`} {(set.isDescending) && '- Descendente'}
                                                </Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                    <TouchableOpacity
                        style={{marginBottom:10}}
                        onPress={()=>addOtherWorkout(item)}
                    >
                        {(!isMovement) && (
                            <Text style={{color:theme.lightPrimary, textAlign:'center'}}>Combinar con otro ejercicio</Text>
                        )}
                    </TouchableOpacity>
            </ScaleDecorator>
        )
    }

    return (
        <View style={styles.container}>
            <GradientBackground />
            <DraggableFlatList 
                data={actualRoutine?.days[numDay - 1].workouts || []}
                renderItem={renderItem}
                keyExtractor={(item)=>(item._id || '')}
                onDragEnd={ ( { data } ) =>updateDayRoutine(day._id ,data)}
                ListHeaderComponent={()=>(
                    <>
                        {(actualRoutine?.days[numDay - 1].workouts?.length !== 0) && (
                            <View style={{...styles.separator, marginTop:15}}>
                                <View style={{ ...styles.separatorLine, borderColor:theme.disabledColor}}/>
                                <View style={styles.rowSeparator}>
                                    <Text style={{fontSize:16, color:theme.disabledColor}}>Comienzo del entrenamiento </Text>
                                    <Icon 
                                        name='flash-outline'
                                        size={20}
                                        color={theme.disabledColor}
                                    />
                                </View>
                                <View style={{ ...styles.separatorLine, borderColor:theme.disabledColor}}/>
                            </View>
                        )}
                    </>
                )}
                ListFooterComponent={()=>(
                    <>
                        {(actualRoutine?.days[numDay - 1].workouts?.length !== 0) 
                            ? (
                                <View style={{...styles.separator, marginTop:15}}>
                                    <View style={{ ...styles.separatorLine, borderColor:theme.disabledColor}}/>
                                    <View style={styles.rowSeparator}>
                                        <Text style={{fontSize:16, color:theme.disabledColor}}>Fin del entrenamiento </Text>
                                        <Icon 
                                            name='bed-outline'
                                            size={20}
                                            color={theme.disabledColor}
                                        />
                                    </View>
                                    <View style={{ ...styles.separatorLine, borderColor:theme.disabledColor}}/>
                                </View>
                            )
                            : (
                                <ScreenEmpty text='No hay ejercicios cargados para este día'/>
                            )
                        }
                        {(!isMovement) && (
                            <SecondaryButton 
                                text='Agregar ejercicio'
                                style={{marginTop:20, marginBottom:50}}
                                onPress={ () => navigation.navigate( 'ChooseMuscleScreen' as any,{
                                    isEditingWorkout: true,
                                    numDay: String(numDay)
                                } ) }
                            />
                        )}
                    </>
                )}
                ItemSeparatorComponent={()=>(
                    <View style={styles.separator}>
                        <View style={{ ...styles.separatorLine, borderColor:theme.disabledColor}}/>
                        <View style={styles.rowSeparator}>
                            <Text style={{color:theme.disabledColor}}>Descanso {formattedTime} </Text>
                            <Icon 
                                name='stopwatch-outline'
                                size={16}
                                color={theme.disabledColor}
                            />
                        </View>
                        <View style={{ ...styles.separatorLine, borderColor:theme.disabledColor}}/>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    rowSeparator:{
        flexDirection:'row',
        marginHorizontal:10
    },
    combinedContainer:{
        marginVertical:15,
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap'
    },
    workoutContainer:{
        flex:1, // verificar q se acomode cuando haya mas de un ejercicio combinado
        // flexWrap: 'wrap',
        minWidth: (SCREENWIDTH / 2) - 30,
        maxWidth: (SCREENWIDTH - 100),
        marginTop:10,
        borderRadius:20,
        marginHorizontal:10,
        alignItems:'center',
        paddingVertical:25,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,

        elevation: 10,
    },
    workoutName:{
        fontSize:18,
        fontWeight:'700',
        marginBottom:10,
        textAlign:'center'
    },
    subtitle:{
        fontSize:18,
        fontWeight:'400',
        marginBottom:5
    },
    maxWeight:{
        fontSize:14,
        marginVertical:10
    },
    label:{
        fontSize:16,
        // marginBottom:10
    },
    separator:{
        marginVertical:5,
        justifyContent:'center', 
        alignItems:'center', 
        flexDirection:'row', 
        marginHorizontal:30
    },
    separatorLine:{
        borderBottomWidth:1, 
        flex:1,
    }
});