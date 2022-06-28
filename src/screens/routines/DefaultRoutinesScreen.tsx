import React, { useContext } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert } from 'react-native';
import { GradientBackground } from '../../components/backgrounds/GradientBackground'
import { defaultRoutines } from '../../assets/default-routines/default-routines';
import { CardRoutine } from '../../components/cards/CardRoutine';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { baseURL } from '../../api/routinesApi';
import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { DefaultRoutine } from '../../interfaces/interfaces';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutinesNavigator } from '../../router/RoutinesNavigator';

const WIDTHSCREEN = Dimensions.get('window').width;

interface Props extends NativeStackScreenProps<RootRoutinesNavigator,'DefaultRoutinesScreen'>{}

export const DefaultRoutinesScreen = ({navigation}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {createRoutine} = useContext(RoutinesContext)

    const onSelectRoutine = async(routine:DefaultRoutine)=>{
        Alert.alert(
            `Rutina seleccionada`,
            `¿Crear rutina ${routine.name} en el inicio?`,
            [{
                text:'Cancelar'
            },{
                text:'Continuar',
                onPress:async()=>{
                    
                    await createRoutine(routine)
                    navigation.popToTop()
                }
            }],
            {
                cancelable:true
            }
        )
    }

    return (
        <View style={styles.container}>
            <GradientBackground />
            <FlatList 
                data={defaultRoutines}
                renderItem={({item})=>(
                    <TouchableOpacity 
                        style={ { 
                            ...styles.cardRoutine, 
                            borderColor:theme.dividerColor, 
                            backgroundColor:theme.colors.card,
                        } }
                        onPress={()=>onSelectRoutine(item)}
                        activeOpacity={0.95}
                    >
                        <View style={styles.imageContainer}>
                            <Image 
                                source={{ uri: `${baseURL}/api/routinesImages/routines/${item.img}` }}
                                style={styles.cardImage}
                            />
                        </View>

                        <View style={styles.dataRoutine}>
                            <Text 
                                style={ {...styles.titleRoutine, color:theme.colors.primary} }
                                adjustsFontSizeToFit
                                numberOfLines={2}
                            >
                                { item.name }
                            </Text>
                            <Text style={{color:theme.lightText}}>Dias: { item.days.length }</Text>
                            {/* {(!routineCreatorIsActualUser && item.creatorUser.name) && (<Text style={{color:theme.disabledColor}}>{`Creado por ${routine.creatorUser.name}`}</Text>)} */}
                        </View>
                    </TouchableOpacity>
                )}
                ListHeaderComponent={()=>(<View style={{height:30}}/>)}
                keyExtractor={(item)=>item._id}
            />
        </View>
    )
}


const styles = StyleSheet.create( {
    container:{
        flex:1
    },
    cardRoutine: {
        overflow:'visible',
        alignItems: 'center',
        borderRadius: 25,
        flexDirection: 'row',
        width: WIDTHSCREEN - 50,
        height: 180,
        justifyContent: 'flex-end',
        marginBottom:15,
        marginHorizontal:( WIDTHSCREEN - (WIDTHSCREEN - 50)) / 2,
        paddingHorizontal:30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
    },
    imageContainer:{
        position: 'absolute',
        zIndex:1,
        left: -5,
        bottom: -5,
    },
    cardImage:{
        width: 180,
        height: 180,
        resizeMode:'contain',
    },
    dataRoutine:{
        height:150,
        marginTop:10,
        justifyContent:'space-around',
        alignItems:'flex-end'
    },
    titleRoutine: {
        fontSize: 20,
        fontWeight:'500',
        maxWidth:140,
        maxHeight:60
    },
} )