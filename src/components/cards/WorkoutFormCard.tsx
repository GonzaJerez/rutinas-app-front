import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { CombinedWorkout, Set, WorkoutInRoutine } from '../../interfaces/interfaces'
import { ThemeContext } from '../../context/theme/ThemeContext'
import { Picker } from '@react-native-picker/picker'
import { SecondaryButton } from '../buttons/SecondaryButton'
import { RoutinesContext } from '../../context/routines/RoutinesContext'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { SetsRow } from '../SetsRow'
import { FloatDeleteIcon } from '../buttons/FloatDeleteIcon'

interface Props {
    item: WorkoutInRoutine;
    index:number;
    state: CombinedWorkout;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    changeWorkout: (tool: string, idWorkout: string) => void;
    deleteWorkout: (idWorkout: string) => void;
    addSet: (idWorkout: string) => void;
    changeSet: (idWorkout: string, idSet: string, form: Set) => void;
    deleteSet: (idWorkout: string, idSet: string) => void
}

export const WorkoutFormCard = ({
    index,
    item,
    state,
    isEditing,
    setIsEditing,
    addSet,
    changeSet,
    changeWorkout,
    deleteSet,
    deleteWorkout
}:Props)=>{

    const {navigate} = useNavigation<any>()

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    const {setActualCombinedWorkouts,actualRoutine} = useContext(RoutinesContext)

    /**
     * Agarra el ejercicio combinado actual y lo almacena en estado global
     * En "cardWorkout" cuando se elije otro ejercicio existiendo ya en el estado global
     * un ejercicio combinado lo agrega a este, sino deja el combinedWorkout como estaba
     */
    const addOtherWorkout = ()=>{
        setActualCombinedWorkouts(state)
        navigate('ChooseMuscleScreen')
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.80}
                onLongPress={()=> setIsEditing(true)}
                style={{...styles.workoutContainer, backgroundColor:colors.background}}
            >
                <View style={ styles.imageContainer }>
                    <Text>Imagen de ejercicio</Text>
                    <Text style={ styles.title }>{item.workout.name}</Text>
                    {(isEditing) && (
                        <FloatDeleteIcon 
                            onPress={()=>deleteWorkout(item._id)}
                            style={{position:'absolute', top:10, right:10}}
                        />
                    )}
                </View>
                <View style={ styles.formContainer }>

                    <View style={ styles.toolContainer }>
                        <Text style={ styles.textLabel }>Tipo de herramienta:</Text>
                        {/* Picker */ }
                        <Picker
                            selectedValue={ item.tool }
                            onValueChange={ ( value ) => changeWorkout( value, item._id ) }
                            style={ { width: 160 } }
                        >
                            <Picker.Item label="Mancuerna" value="Mancuerna" />
                            <Picker.Item label="Barra" value="Barra" />
                            <Picker.Item label="Polea" value="Polea" />
                            <Picker.Item label="Libre" value="Libre" />
                            <Picker.Item label="Maquina" value="Maquina" />
                            <Picker.Item label="Elástico" value="Elástico" />
                        </Picker>
                    </View>

                    <Text style={ styles.subtitle }>Series</Text>

                    <View style={ styles.containerSets }>
                        {
                            item.sets.map( ( set ) =>(
                                <SetsRow 
                                    set={set}
                                    idWorkout={item._id}
                                    typeUnit={actualRoutine?.typeUnit || 'kg'}
                                    isEditing={isEditing}
                                    changeSet={changeSet}
                                    deleteSet={deleteSet}
                                    key={set._id}
                                />
                            ))
                        }
                        <SecondaryButton text='Agregar serie' onPress={()=>addSet(item._id)}/>
                    </View>
                </View>
            
            </TouchableOpacity>
            {
                (index === state.combinedWorkouts.length - 1)
                && (
                    <TouchableOpacity
                        onPress={addOtherWorkout}
                        style={{...styles.addWorkoutButton, backgroundColor:theme.lightPrimary}}
                    >
                        <Text style={{color:colors.background}}>Combinar con otro ejercicio</Text>
                    </TouchableOpacity>
                )
            }
            
        </View>
    )
}

const styles = StyleSheet.create( {
    container:{
        alignItems:'center', 
        // justifyContent:'center'
        // marginTop:-20
    },
    workoutContainer:{
        marginTop: 40,
        width: 380,
        borderRadius:25,
        overflow:'hidden',
        borderWidth:1,
        borderColor:'#ddd',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    imageContainer: {
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc'
    },
    formContainer: {
        paddingHorizontal: 25,
        marginTop: 20
    },
    title: {
        fontSize: 25,
        color:'#eee'
    },
    toolContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerSets: {
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 20
    },
    textLabel: {
        fontSize: 18,
    },
    addWorkoutButton:{
        height:40,
        width:250,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
        borderRadius:20,
        // marginBottom:50
        marginVertical:40
    },
} );