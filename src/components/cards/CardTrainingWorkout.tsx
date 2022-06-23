import { View, Text, StyleSheet, FlatList, Animated, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { WorkoutInRoutine } from '../../interfaces/interfaces';
import { RoutinesContext } from '../../context/routines/RoutinesContext';
import NumsToPickerNumbers from '../NumsToPickerNumbers';
import { calculate1RM } from '../../helpers/calculate1RM';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { baseURL } from '../../api/routinesApi';
import Icon from 'react-native-vector-icons/Ionicons';
import { InfoModeTraining } from '../modals/InfoModeTraining';
// import { FlatList } from 'react-native-gesture-handler';

// const numsToWeight:number[] = [];
// for (let i = 0; i < 1000; i++) {
//     numsToWeight.push(i)
// }

const HEIGHT_ITEM = 40;

interface Props {
    workoutInRoutine:   WorkoutInRoutine,
    numActualSet:       number;
    numTotalSets:       number;
    shadow:             boolean;
    onChangeWeight:     (idWorkoutInRoutine: string, weight: number) => void
}

export const CardTrainingWorkout = ({workoutInRoutine,numActualSet,numTotalSets, shadow, onChangeWeight}:Props) => {
    
    const {actualRoutine} = useContext(RoutinesContext)
    const {theme} = useContext(ThemeContext)

    const [isOpenModalInfo, setIsOpenModalInfo] = useState(false);

    const numsToWeight = useMemo(()=>{
        return [...Array(1000).keys()] 
    },[])

    return (
        <Animated.View style={{
            ...styles.cardContainer, 
            elevation:(shadow) ? 7 : 0,
            backgroundColor: theme.colors.card
        }}>
            {(isOpenModalInfo) && (
                <InfoModeTraining 
                    isOpenModalInfo={isOpenModalInfo}
                    setIsOpenModalInfo={setIsOpenModalInfo}
                />
            )}
            <View style={styles.imageContainer}>
                <Image 
                    source={ { uri: `${baseURL}/api/routinesImages/workouts/${workoutInRoutine.workout.img}` } }
                    style={styles.image}
                    blurRadius={1}
                />
                <View style={styles.darkBackground}/>
                <Text style={{...styles.nameWorkout, color:theme.whiteColor}}>{workoutInRoutine.workout.name}</Text>
            </View>

            <View style={styles.infoWorkout}>
                <Text style={{...styles.label, color:theme.colors.text}}>{`Serie ${numActualSet} de ${numTotalSets}`}</Text>
                <Text style={{...styles.label, color:theme.colors.text}}>{workoutInRoutine.sets[numActualSet - 1].numReps} repeticiones</Text>
                <Text style={{...styles.label, color:theme.colors.text}}>{workoutInRoutine.tool}</Text>
                <TouchableOpacity
                    activeOpacity={0.9} 
                    style={{flexDirection:'row',alignItems:'center'}}
                    onPress={()=>setIsOpenModalInfo(true)}
                >
                    <Text style={{...styles.label, color:theme.colors.text, marginRight:5}}>{workoutInRoutine.mode}</Text>
                    <Icon 
                        name='information-circle-outline'
                        size={18}
                        color={theme.lightText}
                        style={{top:1}}
                    />
                </TouchableOpacity>
                <Text style={{...styles.label, color:theme.colors.text}}>Último peso: {workoutInRoutine.sets[numActualSet - 1].weight || 0} {actualRoutine?.typeUnit}</Text>
                <Text style={{...styles.maxWeight, color:theme.disabledColor}}>{`1RM : ${calculate1RM(workoutInRoutine.sets)} ${actualRoutine?.typeUnit}`}</Text>
                {(workoutInRoutine.sets[numActualSet - 1].isDescending) && (
                    <Text style={{...styles.label, color:theme.colors.text}}>Serie descendente</Text>
                )}
            </View>

            <View style={ styles.newWeightContainer }>
                <Text style={ {...styles.label, color:theme.colors.text} }>Nuevo peso:</Text>

                <View style={styles.carouselWeight}>
                    <FlatList 
                        data={numsToWeight}
                        keyExtractor={(item)=>item.toString()}
                        ListHeaderComponent={()=>(<View style={{marginTop:56}}/>)}
                        renderItem={({item})=>(<NumsToPickerNumbers item={item}/>)}
                        showsVerticalScrollIndicator={false}
                        onScroll={({nativeEvent})=>onChangeWeight(workoutInRoutine._id, nativeEvent.contentOffset.y/HEIGHT_ITEM)}
                        snapToOffsets={numsToWeight.map((x, i) => (
                            i * HEIGHT_ITEM 
                        ))}
                        getItemLayout={(data,index)=>({length:HEIGHT_ITEM, offset:HEIGHT_ITEM * index, index})}
                        initialScrollIndex={Number(workoutInRoutine.sets[numActualSet - 1].weight) || 0}
                        maxToRenderPerBatch={20}
                        initialNumToRender={Number(workoutInRoutine.sets[numActualSet - 1].weight)}
                        // style={{backgroundColor:'red', marginTop:55, overflow:'visible'}}
                    />
                </View>
                <Text style={{...styles.label, color:theme.lightText}}>{actualRoutine?.typeUnit}</Text>
                <View style={{backgroundColor:theme.cardTransparent,position:'absolute', height:42, width:'100%',top:0}}/>
                <View style={{position:'absolute', height:30, width:'100%'}}/>
                <View style={{backgroundColor:theme.cardTransparent,position:'absolute', height:42, width:'100%', bottom:0}}/>
            </View>

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    cardContainer:{
        // marginTop:20,
        marginBottom:50,
        overflow:'hidden',
        // width:350,
        // height:550,
        borderRadius:25,
        backgroundColor:'white',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
    },
    imageContainer:{
        height:150,
        backgroundColor:'#ccc',
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        position:'absolute', 
        width:'100%', 
        height:'100%',
        resizeMode:'cover',
    },
    darkBackground:{
        ...StyleSheet.absoluteFillObject,
        position:'absolute', 
        backgroundColor:'#00000099'
    },
    nameWorkout: {
        position:'absolute',
        fontSize:25,
        fontWeight:'500'
    },
    infoWorkout:{
        alignItems:'center',
        marginTop:10
    },
    label:{
        fontSize:18,
        marginVertical:5
    },
    maxWeight:{
        fontSize:18,
        fontWeight:'500',
        marginBottom:30
    },
    newWeightContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        height:140
    },
    buttonsWeight:{
        fontSize:22,
        color:'#F88114',
        fontWeight:'800'
    },
    carouselWeight:{
        height:140,
    },
    numWeight:{
        fontSize:22,
        height:HEIGHT_ITEM,
        marginLeft:20,
        marginRight:10,
    },
});