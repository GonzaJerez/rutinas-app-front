import React, { useContext, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, Alert, TouchableOpacity, Text, Animated, PanResponder, Dimensions } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from "react-native-draggable-flatlist";
import { Swipeable } from 'react-native-gesture-handler'

import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { RootRoutinesNavigator } from '../../router/RoutinesNavigator';
import { HeaderTitleBack } from '../../components/headers/HeaderTitleBack';
import { GradientBackground } from '../../components/backgrounds/GradientBackground';
import { Title } from '../../components/headers/Title';
import { CardWorkout } from '../../components/cards/CardWorkout';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { WorkoutInRoutine, CombinedWorkout } from '../../interfaces/interfaces';
import { CardWorkoutInRoutine } from '../../components/cards/CardWorkoutInRoutine';
import { RightSwipe } from '../../components/swipers/RightSwipe';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import uuid from 'react-native-uuid';

const widthScreen = Dimensions.get('window').width;

interface Props extends NativeStackScreenProps<RootRoutinesNavigator, 'WorkoutsInRoutineScreen'> { }

export const WorkoutsInRoutineScreen = ( { navigation, route }: Props ) => {

    const {numDay } = route.params;

    const {actualRoutine, deleteWorkoutInRoutine, updateDayRoutine} = useContext(RoutinesContext)
    const actualDay = actualRoutine!.days[numDay - 1]
    
    
    // const { theme: { colors } } = useContext( ThemeContext )
    // const [ editing, setEditing ] = useState( '' )

    // Modal para verificar que se quiere eliminar el ejercicio
    const onDeleteWorkoutInRoutine = (idWorkoutInRoutine:string) => {
        Alert.alert(
            'Eliminar ejercicio',
            '¿Seguro eliminar este ejercicio? Esta acción no se puede deshacer.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }, {
                    text: 'Eliminar',
                    // onPress: () => deleteWorkoutInRoutine(actualDay._id, idWorkoutInRoutine)
                }
            ], {
            cancelable: true,
        }
        )
    }

    const renderItem = ( { item, drag }: RenderItemParams<CombinedWorkout> ) => {
        return (
            <ScaleDecorator>
                
                <View style={styles.cardContainer} key={item._id}>
                    <Swipeable
                        overshootRight={false}
                        renderRightActions={()=>(
                            <RightSwipe size="sizeDay" id={item._id || ''} onDelete={onDeleteWorkoutInRoutine}/>
                        )}
                    >
                        <CardWorkoutInRoutine
                            idDay={actualDay._id}
                            combinedWorkouts={item}
                            drag={drag}
                        />
                    </Swipeable>
                </View>
                    
            </ScaleDecorator>
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
                onPress={ () => navigation.navigate( 'ChooseMuscleScreen' as any ) }
            />

            <View style={styles.listContainer}>
                <DraggableFlatList
                    data={ actualDay.workouts || [] }
                    onDragEnd={ ( { data } ) => updateDayRoutine(actualDay._id,data) }
                    keyExtractor={ ( item ) => uuid.v4().toString() }
                    renderItem={ renderItem }
                    showsVerticalScrollIndicator={ false }
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    title: {
        marginTop: 40,
        marginLeft: 20
    },
    secondaryButton: {
        marginVertical: 20
    },
    listContainer:{
        alignSelf:'center',
        width:400,
    },
    cardContainer:{
        alignItems:'center', 
        marginTop:10
    }
} );