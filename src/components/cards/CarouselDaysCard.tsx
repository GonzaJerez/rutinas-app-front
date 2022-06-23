import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { Day, Muscle } from '../../interfaces/interfaces';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatDeleteIcon } from '../buttons/FloatDeleteIcon';
import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { baseURL } from '../../api/routinesApi';
import { lightTheme } from '../../context/theme/themeReducer';

interface Props {
    numDay:       number;
    actualDay:    Day;
    isEditing:    boolean;
    onDeleteDay:  (idDay: string, callback: () => void) => void
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const CarouselDayCard = ({actualDay,numDay,isEditing,setIsEditing,onDeleteDay}:Props) => {

    const {navigate} = useNavigation<any>()
    const {theme} = useContext(ThemeContext)
    const {colors} = theme;
    const {actualRoutine} = useContext(RoutinesContext)
    const [musclesInThisDay, setMusclesInThisDay] = useState<string[]>([])
    const workoutsInReverse = [...actualDay.workouts || []].reverse()
    
    /**
     * Cada músculo que se hace en este día de rutina lo agrega al array musclesInThisDay para poder mostrarlo
     * en la tarjeta
     */

    useEffect(()=>{
        setMusclesInThisDay([])
    },[])

    useEffect(()=>{
        workoutsInReverse.map( workout => {
            workout.combinedWorkouts.map( work => {
                if (!musclesInThisDay.includes(work.workout?.muscle?.name)) {
                    setMusclesInThisDay([...musclesInThisDay, work.workout?.muscle?.name])
                }
            })
        })
    },[actualRoutine,musclesInThisDay])

    const top = useRef(new Animated.Value(0)).current
    const deleteAnimation = ()=>{
        Animated.timing(
            top,{
                toValue:-500,
                useNativeDriver:false,
                duration:300
            }
        ).start()
    }

    const onDelete = () =>{
        onDeleteDay(actualDay._id, deleteAnimation )
    }
    
    
    return (
        <TouchableOpacity
            onPress={()=>navigate('DayRoutineScreen',{
                numDay,
                day: actualDay,
                typeUnit: actualRoutine?.typeUnit,
                timer: actualRoutine?.timer
            })}
            onLongPress={(actualRoutine?.days.length === 1) 
                ? ()=>{} 
                : ()=>setIsEditing(true)}
            activeOpacity={0.9}
            
        >
            <Animated.View style={{...styles.card, top}}>
                <Image
                    source={{ uri: `${baseURL}/api/routinesImages/days/dia-${numDay}.jpg` }}
                    style={styles.image}
                />
                <LinearGradient
                    colors={ [ 'transparent', '#111' ] }
                    style={ { ...StyleSheet.absoluteFillObject } }
                    start={ { x: 1, y: 0.6 } }
                    end={ { x: 1, y: 0.9 } }
                />
                {(isEditing) && (
                    <FloatDeleteIcon 
                        onPress={onDelete}
                        style={{position:'absolute', top:10, right:10}}
                    />
                )}
                
                <View style={{alignItems:'center'}}>
                    <Text style={{...styles.numDay, color:theme.whiteColor}}>{ `Dia ${numDay}` }</Text>
                    <Text style={{color:colors.text}}>
                    {
                        musclesInThisDay.map( (muscle, index) => (
                            (index === 0) 
                                ? `${muscle}`
                                : ` - ${muscle}`
                        
                        ))
                    }
                        </Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 400,
        marginBottom:20,
        paddingBottom: 20,
        borderRadius: 25,
        justifyContent: 'flex-end',
        alignItems:'center',
        overflow:'hidden',
        paddingHorizontal:10,
        shadowColor: "#00000090",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    imageContainer:{
        justifyContent:'center',
        alignItems:'center',
        // position:'absolute',
        width:300,
        height:500,
        // top:-90,
        // left:-50,
    },
    image:{
        resizeMode:'cover', 
        width:300, 
        height:400, 
        position:'absolute' 
    },
    deleteIcon:{
        position: 'absolute',
        top: 10,
        right: 10,
        borderWidth: 1,
        borderRadius: 50,
        padding:5,
        opacity: 0.7
    },
    numDay:{
        fontSize:28,
        fontWeight: '600',
        marginBottom:10
    }
});