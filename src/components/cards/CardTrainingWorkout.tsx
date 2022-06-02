import { View, Text, StyleSheet, FlatList, Animated } from 'react-native'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { WorkoutInRoutine } from '../../interfaces/interfaces';
import { RoutinesContext } from '../../context/routines/RoutinesContext';
import NumsToPickerNumbers from '../NumsToPickerNumbers';
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

    const numsToWeight = useMemo(()=>{
        return [...Array(1000).keys()] 
    },[])

    return (
        <Animated.View style={{...styles.cardContainer, elevation:(shadow) ? 7 : 0}}>
            <View style={styles.imageContainer}>
                {/* Agregar imagen */}
                <LinearGradient
                    colors={ [ '#ccc', 'white' ] }
                    style={ { ...StyleSheet.absoluteFillObject } }
                    start={ { x: 1, y: 0.6 } }
                    end={ { x: 1, y: 1.2 } }
                />
                <Text style={styles.nameWorkout}>{workoutInRoutine.workout.name}</Text>
            </View>

            <View style={styles.infoWorkout}>
                <Text style={styles.label}>{`Serie ${numActualSet} de ${numTotalSets}`}</Text>
                <Text style={styles.label}>{workoutInRoutine.sets[numActualSet - 1].numReps} repeticiones</Text>
                <Text style={styles.label}>{workoutInRoutine.tool}</Text>
                <Text style={styles.label}>Último peso: {workoutInRoutine.sets[numActualSet - 1].weight || 0} {actualRoutine?.typeUnit}</Text>
            </View>

            <View style={ styles.newWeightContainer }>
                <Text style={ styles.label }>Nuevo peso:</Text>

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
                <Text style={styles.label}>kg</Text>
                <View style={{backgroundColor:'#ffffff70',position:'absolute', height:42, width:'100%',top:0}}/>
                <View style={{position:'absolute', height:30, width:'100%'}}/>
                <View style={{backgroundColor:'#ffffff70',position:'absolute', height:42, width:'100%', bottom:0}}/>
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
        height:450,
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
        // borderBottomWidth:1,
        height:150,
        backgroundColor:'#ccc',
        alignItems:'center',
        justifyContent:'center'
    },
    nameWorkout: {
        position:'absolute',
        fontSize:25,
        fontWeight:'500'
    },
    infoWorkout:{
        // marginTop:30,
        alignItems:'center'
    },
    label:{
        fontSize:20,
        marginVertical:5
    },
    newWeightContainer:{
        flexDirection:'row',
        // marginTop:30,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'red',
        // borderWidth:1,
        overflow:'hidden',
        height:140
        // paddingBottom:20
    },
    buttonsWeight:{
        fontSize:22,
        color:'#F88114',
        fontWeight:'800'
    },
    carouselWeight:{
        height:140,
        // marginTop:60,
        // backgroundColor:'red',
        // top:-20
    },
    numWeight:{
        fontSize:22,
        height:HEIGHT_ITEM,
        // alignItems:'center',
        // justifyContent:'center',
        // backgroundColor:'red',
        // borderWidth:1,
        marginLeft:20,
        marginRight:10,
    },
});