import React, { useContext } from 'react'
import { View, Text, TextInput, StyleSheet, Switch } from 'react-native'

import { ThemeContext } from '../context/theme/ThemeContext';
import { Set } from '../interfaces/interfaces';
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

    const {theme} = useContext(ThemeContext)

    return (
        <View style={styles.container}>
            <View style={ styles.set } key={ set._id }>
                <View style={ styles.row }>
                    <Text style={ {...styles.textLabel, color:theme.lightText} }>Cantidad de repes:</Text>
                    <TextInput
                        placeholder='12'
                        placeholderTextColor={theme.placeholderColor}
                        value={ set.numReps.toString() }
                        maxLength={2}
                        keyboardType='numeric'
                        style={ {...styles.textInput, color:theme.colors.text} }
                        onChangeText={ ( value ) => changeSet( idWorkout, set._id, { ...set, numReps: value } ) }
                    />
                </View>

                <View style={ styles.row }>
                    <Text style={ {...styles.textLabel, color:theme.lightText} }>Peso:</Text>
                    <View style={ styles.row }>
                        <TextInput
                            placeholder='25'
                            placeholderTextColor={theme.placeholderColor}
                            value={ set.weight?.toString() || '' }
                            maxLength={3}
                            keyboardType='numeric'
                            style={ {...styles.textInput, color:theme.colors.text} }
                            onChangeText={ ( value ) => changeSet( idWorkout, set._id, { ...set, weight: value } ) }
                        />
                        <Text style={ {...styles.textLabel, color:theme.lightText} }>{ typeUnit }</Text>
                    </View>
                </View>

                <View style={ styles.row }>
                    <Text style={ {...styles.textLabel, color:theme.lightText} }>Descendente:</Text>
                    <Switch
                        value={set.isDescending}
                        onValueChange={( value ) => changeSet( idWorkout, set._id, { ...set, isDescending: value } )}
                        trackColor={{false: theme.dividerColor, true: theme.lightPrimary}}
                        thumbColor={(set.isDescending) ? theme.colors.primary : theme.grey}
                    />
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
        alignItems:'center',
        borderColor: '#11111130',
        marginBottom:10
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
        fontSize: 16,
    },
    textInput: {
        fontSize: 16,
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