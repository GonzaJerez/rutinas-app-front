import React, { useContext, useState } from 'react'
import { View, StyleSheet, FlatList, Alert, TouchableOpacity, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { RoutinesContext } from '../context/routines/RoutinesContext';
import { ThemeContext } from '../context/theme/ThemeContext';
import { RootPrivateNavigator } from '../router/PrivateNavigator';
import { HeaderTitleBack } from '../components/HeaderTitleBack';
import { GradientBackground } from '../components/GradientBackground';
import { Title } from '../components/Title';
import { CardWorkout } from '../components/CardWorkout';
import { SecondaryButton } from '../components/SecondaryButton';

interface Props extends NativeStackScreenProps<RootPrivateNavigator, 'WorkoutsInRoutineScreen'> { }

export const WorkoutsInRoutineScreen = ( { navigation, route }: Props ) => {

    const {numDay } = route.params;

    const {actualRoutine, deleteWorkoutInRoutine} = useContext(RoutinesContext)
    const actualDay = actualRoutine!.days[numDay - 1]
    
    const { theme: { colors } } = useContext( ThemeContext )
    const [ editing, setEditing ] = useState( '' )
    

    // const {onDeleteWorkout} = useDeleteWorkoutInRoutine(actualDay._id, editing)

    // Modal para verificar que se quiere eliminar el ejercicio
    const deleteDay = (idWorkoutInRoutine:string) => {
        Alert.alert(
            'Eliminar rutina',
            '¿Seguro deseas eliminarla? Esta acción no se puede deshacer.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }, {
                    text: 'Eliminar',
                    onPress: () => deleteWorkoutInRoutine(actualDay._id, idWorkoutInRoutine)
                }
            ], {
            cancelable: true,
        }
        )
    }

    return (
        <View style={ styles.container }>
            <GradientBackground />
            <HeaderTitleBack text={ `Dia ${numDay}` } />

            <Title style={ styles.title } text='Ejercicios' />

            <SecondaryButton
                style={ styles.secondaryButton }
                text='Agregar ejercicio'
                onPress={ () => navigation.navigate( 'ChooseMuscleScreen' ) } />

            <FlatList
                data={ actualDay.workouts }
                renderItem={ ( { item } ) => (
                    <View style={styles.cardContainer}>
                        <CardWorkout 
                            workout={ item.workout } 
                            idDay={ actualDay._id }
                            workoutInRoutine={item}
                            setEditing={ setEditing }
                        />
                        {
                            (editing === item._id)
                                && (
                                    <View style={ { ...styles.card, ...StyleSheet.absoluteFillObject, top:10, left: 10, backgroundColor: colors.card } }>                               
                                            <TouchableOpacity
                                                style={ styles.buttons }
                                                onPress={ ()=> deleteDay(item._id || '') }
                                            >
                                                <Icon name='trash-outline' size={ 30 } color={ colors.text } />
                                                <Text style={ { ...styles.buttonsText, color: colors.text } }>Eliminar</Text>
                                            </TouchableOpacity>
                                        
                                            <TouchableOpacity
                                                onPress={ () => setEditing( '' ) }
                                            >
                                                <Text style={ { ...styles.buttonsText, color: colors.primary } }>Cancelar</Text>
                                            </TouchableOpacity>

                                    </View>
                                )
                        }
                    
                    </View>
                    
                ) }
                numColumns={ 2 }
            />

        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1
    },
    title: {
        marginTop: 40,
        marginLeft: 20
    },
    secondaryButton: {
        marginVertical: 20
    },
    cardContainer:{
        justifyContent: 'center', 
        alignItems:'center', 
        padding:10, 
        marginLeft:14
    },
    card: {
        position:'absolute',
        flexDirection: 'row',
        // marginVertical: 20,
        marginBottom: 20,
        height: 100,
        width:165,
        borderRadius: 25,
        // paddingHorizontal: 20,
        justifyContent: 'space-evenly',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
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