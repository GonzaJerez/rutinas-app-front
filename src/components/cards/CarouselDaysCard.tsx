import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { Day, Muscle } from '../../interfaces/interfaces';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatDeleteIcon } from '../buttons/FloatDeleteIcon';

interface Props {
    numDay:       number;
    actualDay:    Day;
    isEditing:    boolean;
    onDeleteDay:  (idDay: string) => void;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const CarouselDayCard = ({actualDay,numDay,isEditing,setIsEditing,onDeleteDay}:Props) => {

    const {navigate} = useNavigation<any>()
    const {theme} = useContext(ThemeContext)
    const {colors} = theme;
    const [musclesInThisDay, setMusclesInThisDay] = useState<string[]>([])
    
    
    /**
     * Cada músculo que se hace en este día de rutina lo agrega al array musclesInThisDay para poder mostrarlo
     * en la tarjeta
     */
    useEffect(()=>{
        actualDay.workouts?.map( workout => {
            workout.combinedWorkouts.map( work => {
                // console.log(work.workout);
                
                if (!musclesInThisDay.includes(work.workout?.muscle?.name)) {
                    setMusclesInThisDay([...musclesInThisDay, work.workout?.muscle?.name])
                }
            })
        })
    },[])
    
    
    return (
        <TouchableOpacity
            onPress={()=> navigate('WorkoutsInRoutineScreen',{actualDay, numDay})}
            onLongPress={()=>setIsEditing(true)}
            activeOpacity={0.9}
            style={styles.card}
        >
            <LinearGradient
                colors={ [ colors.card, '#111' ] }
                style={ { ...StyleSheet.absoluteFillObject } }
                start={ { x: 1, y: 0.6 } }
                end={ { x: 1, y: 1.2 } }
            />
            <View style={styles.imageContainer}>
                {/* <Image
                    source={muscle.uri}
                    style={{resizeMode:'contain', width:300, height:400, flex:1 }}
                /> */}
            </View>
            {(isEditing) && (
                <FloatDeleteIcon 
                    onPress={()=>onDeleteDay(actualDay._id)}
                    style={{position:'absolute', top:10, right:10}}
                />
            )}
            
            <View>
                <Text style={{...styles.numDay, color:colors.text}}>{ `Dia ${numDay}` }</Text>
                {
                    musclesInThisDay.map( (muscle, index) => (
                        <Text key={muscle}>{
                            (index === 0) 
                                ? `${muscle}`
                                : ` - ${muscle}`
                        }</Text>
                    ))
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 400,
        marginBottom:20,
        marginTop:30,
        paddingRight: 50,
        paddingBottom: 40,
        borderRadius: 25,
        justifyContent: 'flex-end',
        overflow:'hidden',
        paddingHorizontal:10,
        // alignItems: 'flex-end',
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
        position:'absolute',
        width:300,
        height:500,
        top:-90,
        left:-50,
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
        fontWeight: '400',
        marginBottom:10
    }
});