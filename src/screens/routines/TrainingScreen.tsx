import React, { useContext, useRef, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Animated } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title } from '../../components/headers/Title';
import { GradientBackground } from '../../components/backgrounds/GradientBackground';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootPrivateNavigator } from '../../router/PrivateNavigator';
import { CombinedWorkout } from '../../interfaces/interfaces';
import { CardTrainingWorkout } from '../../components/cards/CardTrainingWorkout';
import { useTraining } from '../../hooks/useTraining';
import { Timer } from '../../components/Timer';
import { RoutinesContext } from '../../context/routines/RoutinesContext';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

interface Props extends NativeStackScreenProps<RootPrivateNavigator,'TrainingScreen'>{}

export const TrainingScreen = ({route, navigation}:Props) => {

    const {dayRoutine} = route.params
    
    const [isTimerFinished, setIsTimerFinished] = useState(false)
    const {
        indexActualCombinedWorkout,
        numActualSet,
        numTotalSets,
        opacity,
        onBreak,
        shadow,
        changeStatusBreak,
        onChangeWeight,
        viewNextWorkouts,
        onFinishTraining
    } = useTraining(dayRoutine.workouts || [], dayRoutine._id)
    
    
    return (
        <SafeAreaView style={styles.container}>

            <GradientBackground />

            <View style={{flexDirection:'row', width:400, alignItems:'center',justifyContent:'center',height:40}}>
                {(viewNextWorkouts()?.length > 0)
                    && (
                        <View style={{position:'absolute', right:10}}>
                            <TouchableOpacity
                                onPress={navigation.goBack}
                            >
                                <Text style={{fontSize:16}}>Terminar entrenamiento</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                {(onBreak)
                    && (
                        <View style={{position:'absolute', left:10}}>
                            <TouchableOpacity
                                onPress={()=>changeStatusBreak({back:true})}
                            >
                                <Text style={{fontSize:16}}>Volver</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

            </View>

            <Animated.View style={{...styles.content, opacity}}>
            {
                (!onBreak)
                ? (
                    <>
                        <View>
                            <Title text='Ejercicio combinado'/>
                        </View>
            
                        <Pagination 
                                dotsLength={(dayRoutine.workouts)
                                    ? dayRoutine?.workouts[indexActualCombinedWorkout]?.combinedWorkouts?.length 
                                    : 0
                                }
                                activeDotIndex={0}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    // marginHorizontal: 8,
                                    // backgroundColor: colors.primary
                                }}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                                containerStyle={{paddingTop:10, paddingBottom:10, marginTop:20}}
                            />
                        <Carousel 
                            data={(dayRoutine.workouts) 
                                ? dayRoutine?.workouts[indexActualCombinedWorkout]?.combinedWorkouts 
                                : []
                            }
                            itemWidth={widthScreen - 50}
                            sliderWidth={widthScreen}
                            renderItem={({item})=>(<CardTrainingWorkout 
                                workoutInRoutine={item}
                                numActualSet={numActualSet}
                                numTotalSets={numTotalSets}
                                shadow={shadow}
                                onChangeWeight={onChangeWeight}
                            />)}
                            keyExtractor={(item)=>item._id}
                        />  
                    </>
                )
                : (
                    <Timer shadow={shadow} setIsTimerFinished={setIsTimerFinished}/>
                )
            }
            </Animated.View>


            {(viewNextWorkouts()?.length > 0)
                && (
                    <ButtonSubmit 
                        text={(!onBreak) 
                            ? 'Comenzar descanso' 
                            : (isTimerFinished)
                                ? 'Siguiente ejercicio'
                                : 'Saltar descanso'
                        }   
                        icon={(!onBreak) 
                            ? 'timer-outline'
                            : (isTimerFinished)
                                ? 'chevron-forward-circle-outline'
                                : 'play-skip-forward-circle-outline'
                        }
                        onPress={changeStatusBreak}
                        style={{width:300, height:70, marginTop:30}}
                    />
                )
            }
            

            <View style={styles.nextWorkoutContainer}>
                {(viewNextWorkouts()?.length > 0)
                    && (
                        <Text style={{alignSelf:'center', fontSize:16}}>Siguiente ejercicio:</Text>
                    )
                }
                

                {(viewNextWorkouts()?.length === 0)
                    ? (<ButtonSubmit 
                        text='Terminar entrenamiento'
                        icon='timer-outline'
                        onPress={onFinishTraining}
                        style={{width:300, height:70, marginTop:30}}
                    />)
                    : (
                        viewNextWorkouts()?.map( workout => (
                            <View style={styles.nextWorkoutRow} key={workout._id}>
                                <Text style={{fontWeight:'800'}}>{workout.workout.name}</Text>
                                {
                                    // Si voy a seguir en la misma combinedWorkouts entonces uso numActualSet como
                                    // indice del siguiente ejercicio, si cambio de combinedWorkouts entonces arranco del indice 0
                                    (numActualSet === numTotalSets)
                                        ? (
                                            <Text> - {workout.sets[numActualSet - 1].numReps} repes - {`${workout.sets[numActualSet - 1].weight || 0} kg`}</Text>
                                        )
                                        : (
                                            <Text> - {workout.sets[numActualSet].numReps} repes - {`${workout.sets[numActualSet].weight || 0} kg`}</Text>
                                        )
                                }
                                
                            </View>

                        ))
                    )
                }

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        height: heightScreen
    },
    content:{
        height: 550,
        alignItems:'center',
        // borderWidth:1
    },
    nextWorkoutContainer:{
        marginVertical:20
    },
    nextWorkoutRow:{
        flexDirection:'row'
    }
});