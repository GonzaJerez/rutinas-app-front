import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../context/theme/ThemeContext';
import { Workout, WorkoutInRoutine } from '../interfaces/interfaces';


// const widthScreen = Dimensions.get( 'window' ).width

interface Props {
    workout: Workout;
    idDay: string;
    workoutInRoutine?: WorkoutInRoutine;
    setEditing?: React.Dispatch<React.SetStateAction<string>>;
}

export const CardWorkout = ( { workout, idDay, workoutInRoutine, setEditing = () => { } }: Props ) => {

    const { navigate } = useNavigation<any>()
    const { theme: { colors } } = useContext( ThemeContext )


    return (
        <TouchableOpacity
            style={ { ...styles.cardContainer, backgroundColor: (workoutInRoutine) ? colors.primary : colors.card, } }
            onPress={ () => { navigate( 'CreateWorkout', { workout, idDay, workoutInRoutine } ) } }
            onLongPress={ (workoutInRoutine) && (() => setEditing( workoutInRoutine._id || '' )) }
        >  
            <View style={ styles.nameContainer }>
                <Text style={ styles.nameText }>{ workout.name }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create( {
    cardContainer: {
        // flexGrow: 1,
        // marginHorizontal: 10,
        // marginTop: 30,
        // maxWidth: ( widthScreen - 80 ) / 2,
        width: 165,
        height: 100,
        // backgroundColor: 'lightblue',
        borderRadius: 25,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    editCard:{
        flexDirection:'row',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameContainer: {
        width: 90,
    },
    nameText: {
        textAlign: 'right',
        fontWeight: '500'
    },
    buttons:{
        marginHorizontal: 10,
        borderRadius:5,
        padding:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsText:{
        fontSize:16,
    }
} );