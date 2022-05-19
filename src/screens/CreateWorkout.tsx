import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';

import { RoutinesContext } from '../context/routines/RoutinesContext';
import { RootPrivateNavigator } from '../router/PrivateNavigator';
import { useWorkoutInRoutine } from '../hooks/useWorkoutInRoutine';
import { ButtonSubmit } from '../components/form/ButtonSubmit';
import { TextError } from '../components/TextError';

interface Props extends NativeStackScreenProps<RootPrivateNavigator, 'CreateWorkout'> { }


export const CreateWorkout = ( { route, navigation }: Props ) => {

    const {idDay, workout, workoutInRoutine} = route.params;
    const {createWorkoutInRoutine, updateWorkoutInRoutine} = useContext(RoutinesContext)
    

    // Funciones para crear y actualizar el workoutInRoutine
    const {
        form,
        sets,
        addSet,
        onChange, 
        onChangeSet
    } = useWorkoutInRoutine(workout, workoutInRoutine)

    const onSaveWorkout = async ()=>{
        if (!workoutInRoutine) {
            await createWorkoutInRoutine(idDay,form)
        } else {
            await updateWorkoutInRoutine(idDay, workoutInRoutine._id || '', form)
        }

        navigation.goBack();
    }

    return (
        <View style={ styles.container }>
            <ScrollView>
                <View style={ styles.imageContainer }>
                    <Text>Imagen de ejercicio</Text>
                </View>

                <View style={ styles.formContainer }>
                    <Text style={ styles.title }>{workout.name}</Text>

                    <View style={ styles.toolContainer }>
                        <Text style={ styles.textLabel }>Tipo de herramienta:</Text>
                        {/* Picker */ }
                        <Picker
                            selectedValue={ form.tool }
                            onValueChange={ ( value ) => onChange( value, 'tool' ) }
                            style={ { width: 160 } }
                        >
                            <Picker.Item label="Mancuerna" value="Dumbell" />
                            <Picker.Item label="Barra" value="Barbell" />
                            <Picker.Item label="Polea" value="Pulley" />
                            <Picker.Item label="Libre" value="Free" />
                        </Picker>
                    </View>

                    <Text style={ styles.subtitle }>Series</Text>

                    <View style={ styles.containerSets }>
                        {
                            sets.map( ( set, index ) => (
                                <View style={ styles.set } key={ index }>
                                    <View style={ styles.row }>
                                        <Text style={ styles.textLabel }>Cantidad de repes:</Text>
                                        <TextInput
                                            placeholder='12'
                                            value={ set.numReps }
                                            keyboardType='numeric'
                                            style={ styles.textInput }
                                            onChangeText={ ( value ) => onChangeSet( value, set._id, 'numReps' ) }
                                        />
                                    </View>

                                    <View style={ styles.row }>
                                        <Text style={ styles.textLabel }>Peso:</Text>
                                        <View style={ styles.row }>
                                            <TextInput
                                                placeholder='25'
                                                value={ set.weight || '' }
                                                keyboardType='numeric'
                                                style={ styles.textInput }
                                                onChangeText={ ( value ) => onChangeSet( value, set._id, 'weight' ) }
                                            />
                                            <Text style={ styles.textLabel }>kg</Text>
                                        </View>
                                    </View>

                                </View>
                            ) )
                        }

                        <TouchableOpacity
                            style={ styles.buttonSecondary }
                            onPress={ addSet }
                        >
                            <Text style={ styles.textButton }>Agregar serie</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                {/* {
                    (error !== '')
                        && <TextError size='medium'>{ error }</TextError>
                } */}
                <ButtonSubmit
                    text='Guardar ejercicio'
                    onPress={ onSaveWorkout }
                    style={ { width: 190, marginTop: 50 } }
                />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        // flex: 1
        // height: heightScreen,
        // backgroundColor: 'red'
    },
    imageContainer: {
        // flex: 2,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc'
    },
    formContainer: {
        // flex: 6,
        paddingHorizontal: 20,
        marginTop: 30
    },
    title: {
        fontSize: 25
    },
    toolContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerSets: {
        marginVertical: 20
    },
    set: {
        // marginTop: 20,
        paddingHorizontal: 20,
        // paddingBottom:10,
        borderWidth: 1,
        borderColor: '#11111150',
        borderRadius: 25,
        // paddingTop:10,
        marginBottom: 10
    },
    subtitle: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginVertical:10,
        alignItems: 'center'
    },
    textLabel: {
        fontSize: 18
    },
    textInput: {
        // borderWidth:1,
        // borderColor: 'orange',
        // borderRadius: 25,
        fontSize: 18,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonSecondary: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: 15,
        color: 'orange'
    },
    buttonSubmitContainer: {
        // bottom:20,
        // position:'absolute',
        // top: heightScreen - 200,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // top: heightScreen -1000
    }
} );