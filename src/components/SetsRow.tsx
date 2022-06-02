import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Set } from '../interfaces/interfaces';
import { Swipeable } from 'react-native-gesture-handler';
import { RightSwipe } from './swipers/RightSwipe';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatDeleteIcon } from './buttons/FloatDeleteIcon';

interface Props {
    set:        Set;
    idWorkout:  string;
    typeUnit:   string;
    isEditing:  boolean;
    changeSet:  ( idWorkout: string, idSet: string, form: Set ) => void
    deleteSet: (idWorkout: string, idSet: string) => void
}

export const SetsRow = ( { set, idWorkout, typeUnit, isEditing, changeSet, deleteSet }: Props ) => {
    return (
        <View style={styles.container}>
            <View style={ styles.set } key={ set._id }>
                <View style={ styles.row }>
                    <Text style={ styles.textLabel }>Cantidad de repes:</Text>
                    <TextInput
                        placeholder='12'
                        value={ set.numReps.toString() }
                        keyboardType='numeric'
                        style={ styles.textInput }
                        onChangeText={ ( value ) => changeSet( idWorkout, set._id, { ...set, numReps: value } ) }
                    />
                </View>

                <View style={ styles.row }>
                    <Text style={ styles.textLabel }>Peso:</Text>
                    <View style={ styles.row }>
                        <TextInput
                            placeholder='25'
                            value={ set.weight?.toString() || '' }
                            keyboardType='numeric'
                            style={ styles.textInput }
                            onChangeText={ ( value ) => changeSet( idWorkout, set._id, { ...set, weight: value } ) }
                        />
                        <Text style={ styles.textLabel }>{ typeUnit }</Text>
                    </View>
                </View>


            </View>
            {(isEditing) && (
                <FloatDeleteIcon 
                    onPress={()=>deleteSet(idWorkout, set._id)}
                    style={{marginLeft:20}}
                />
            )}
                
        </View>
    )
}


const styles = StyleSheet.create( {
    container:{
        flexDirection:'row', 
        borderBottomWidth: 1,
        // borderColor: '#11111190',
        alignItems:'center',
        borderColor: '#11111130',
        // borderColor:'#111'
    },
    set: {
        // paddingHorizontal: 20,
        marginBottom: 10,
        flex:1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 35
    },
    textLabel: {
        fontSize: 18,
    },
    textInput: {
        fontSize: 18,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:5
    },
    deleteIcon:{
        // position: 'absolute',
        top: 10,
        right: 10,
        // borderWidth: 1,
        borderRadius: 50,
        padding:5,
        marginLeft:20
        // opacity: 0.7,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.29,
        // shadowRadius: 4.65,

        // elevation: 7,
    },
} );