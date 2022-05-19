import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { RoutinesContext } from '../context/routines/RoutinesContext';
import { ThemeContext } from '../context/theme/ThemeContext';
import { RootPrivateNavigator } from '../router/PrivateNavigator';
import { GradientBackground } from '../components/GradientBackground';
import { HeaderTitleBack } from '../components/HeaderTitleBack';
import { SecondaryButton } from '../components/SecondaryButton';

interface Props extends NativeStackScreenProps<RootPrivateNavigator, 'RoutineScreen'> { }

export const RoutineScreen = ( {navigation }: Props ) => {

    const { actualRoutine, deleteDayRoutine, createDayRoutine } = useContext( RoutinesContext )

    const { theme } = useContext( ThemeContext )
    const { colors } = theme;
    
    const [ editing, setEditing ] = useState( '' )

    // Modal para verificar que se quiere eliminar la rutina
    const deleteDay = (idDay:string)=>{
        Alert.alert(
            'Eliminar rutina', 
            '¿Seguro deseas eliminarla? Esta acción no se puede deshacer.',
            [
                {
                    text:'Cancelar',
                    style:'cancel'
                },{
                    text: 'Eliminar',
                    onPress: ()=> deleteDayRoutine(idDay)
                }
            ],{
                cancelable: true,
            }
        )
    }


    return (
        <View style={ styles.container }>
            <GradientBackground />
            <HeaderTitleBack text={ actualRoutine?.name || '' } />

            <View style={ styles.cardsContainer }>
                <FlatList
                    data={ actualRoutine?.days }
                    renderItem={ ( { item, index } ) => (
                        <TouchableOpacity
                            style={ { ...styles.card, backgroundColor: colors.background } }
                            activeOpacity={0.8}
                            onLongPress={ () => setEditing( item._id ) }
                            onPress={()=> navigation.navigate('WorkoutsInRoutineScreen',{actualDay:item, numDay:index + 1})}
                        >
                            {
                                ( editing === item._id )
                                    ? (
                                        <View style={ { ...styles.card, ...StyleSheet.absoluteFillObject, backgroundColor: colors.card } }>                               
                                                <TouchableOpacity
                                                    style={ styles.buttons }
                                                    onPress={ ()=> deleteDay(item._id) }
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
                                    : (
                                        <View style={ styles.cardDay }>
                                            <Text style={ { ...styles.textCard, color: colors.text } }>Dia {index +1}</Text>
                                            <Icon
                                                name='chevron-forward-outline'
                                                size={ 30 }
                                            />
                                        </View>
                                    )
                            }


                        </TouchableOpacity>
                    ) }
                />
            </View>

            <SecondaryButton text='Agregar nuevo día' onPress={ ()=> createDayRoutine(actualRoutine?._id || '') } />

        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1
    },
    cardsContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    card: {
        flexDirection: 'row',
        // marginVertical: 20,
        marginBottom: 20,
        height: 100,
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
    cardDay: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:20,
    },
    textCard: {
        fontSize: 30
    },
    buttonsContainer:{
        flexDirection: 'row',
        // backgroundColor:'red',
        justifyContent: 'center',
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