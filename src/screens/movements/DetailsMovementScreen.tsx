import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet,TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootSocialNavigator } from '../../router/SocialNavigator';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { CardUser } from '../../components/cards/CardUser';
import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { MovementsContext } from '../../context/movements/MovementsContext';
import { AuthContext } from '../../context/auth/AuthContext';

interface Props extends NativeStackScreenProps<RootSocialNavigator,'DetailsMovementScreen'>{}

export const DetailsMovementScreen = ({route, navigation}:Props) => {

    useEffect(()=>{
        if(navigation.getState().index === 0){
            navigation.setOptions({
                headerLeft:()=>(
                    <TouchableOpacity
                        onPress={()=>navigation.replace('SocialTopNavigator', {screen: 'MovementsScreen'})}
                        style={{marginRight:10}}
                    >
                        <Icon 
                            name='arrow-back-outline'
                            size={25}
                            color={theme.whiteColor}
                        />
                    </TouchableOpacity>
                )
            })
        }
    },[])

    const {movement,isSent,dateSpanishFormat } = route.params;
    const {user} = useContext(AuthContext)
    const {theme} = useContext(ThemeContext)
    const {setActualRoutine, addNewRoutineToListRoutines} = useContext(RoutinesContext)
    const {socket,updateMovement} = useContext(MovementsContext)
    const [statusMovement, setStatusMovement] = useState(movement.to.find( userTo => userTo._id === user?._id)?.status)

    const onDetailDay = (index:number) => {
        setActualRoutine(movement.routineAtSentMoment)
        navigation.navigate('DayRoutineScreen', {
            numDay: index + 1,
            day: movement.routineAtSentMoment.days[index],
            typeUnit: movement.routineAtSentMoment.typeUnit,
            timer: movement.routineAtSentMoment.timer,
            isMovement: true
        })
    }

    const userRoutine = movement.routines.find(routine => routine.actualUser._id === user?._id)
    
    const onAcceptRoutine = ()=>{
        if (!userRoutine) return;
        socket.emit('routineSendingResponse', {
            idRoutine: userRoutine?._id, 
            idMovement:movement._id,
            from: movement.from,
            accepted:true 
        })
        setStatusMovement('Accepted')
        updateMovement(movement._id, 'Accepted')
        addNewRoutineToListRoutines(userRoutine)
    }

    const onRejectRoutine = ()=>{
        if (!userRoutine) return;
        socket.emit('routineSendingResponse', {
            idRoutine: userRoutine?._id, 
            idMovement:movement._id,
            from: movement.from,
            accepted:false 
        })
        setStatusMovement('Rejected')
        updateMovement(movement._id, 'Rejected')
    }

    return (
        <>
            <ScrollView style={styles.container}>

                <View style={styles.titleContainer}>
                    <Text style={{...styles.title, color:theme.colors.text}}>{movement.routineAtSentMoment.name}</Text>
                    <Text style={{...styles.label, color:theme.lightText}}>Días: {movement.routineAtSentMoment.days.length}</Text>
                    {(statusMovement !== 'Pending') && (
                        <Text style={{color:theme.lightText}}>{statusMovement}</Text>
                    )}
                </View>

                <View style={{...styles.separator, borderColor:theme.lightPrimary}}/>

                <View style={styles.dataContainer}>
                    <Text style={{color:theme.lightText}}>
                        {(isSent) 
                            ? `Enviado a: `
                            : `Recibido de: `
                        }
                    </Text>
                    
                    {(isSent)
                        ? (
                            <FlatList 
                                data={movement.to}
                                renderItem={({item})=>(
                                    <CardUser isSent user={item}/>
                                )}
                                keyExtractor={(item)=>(item._id)}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        )
                        : (
                            <CardUser isSent={false} movement={movement}/>
                        )
                    }
                    <Text style={{...styles.label, color:theme.lightText}}>{(isSent) ? 'Enviado el' : 'Recibido el'} {dateSpanishFormat} </Text>
                </View>

                <View style={{...styles.separator, borderColor:theme.lightPrimary}}/>

                <View style={styles.detailsRoutine}>
                    <Text style={{...styles.subtitle, color:theme.colors.text}}>Detalle de rutina</Text>
                    {
                        (movement.routineAtSentMoment.days.map( (day, index) =>(
                            <TouchableOpacity 
                                onPress={()=>onDetailDay(index)}
                                key={day._id}
                                style={{...styles.dayRow, borderColor:theme.lightText}}
                            >
                                <Text style={{...styles.label, color:theme.colors.text}}>{`Día ${index + 1}`}</Text>
                                <Icon 
                                    name='chevron-forward-outline'
                                    size={20}
                                    color={theme.colors.text}
                                />
                            </TouchableOpacity>
                        )))
                    }

                </View>
            </ScrollView>
            {(statusMovement === 'Pending') && (
                <View style={styles.buttonsContainer}>
                    <SecondaryButton text='Rechazar rutina' onPress={onRejectRoutine}/>
                    <ButtonSubmit text='Aceptar rutina' onPress={onAcceptRoutine} style={{width:150}}/>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:25,
        flex:1,
    },
    label:{
        fontSize:16,
    },
    titleContainer:{
        alignItems:'center',
        marginTop:30
    },
    title:{
        fontWeight:'500',
        fontSize: 30,
    },
    separator:{
        borderBottomWidth:1,
        width:300,
        marginVertical:30,
        alignSelf:'center'
    },
    dataContainer:{
        alignSelf:'flex-start',
        height: 150,
        justifyContent:'space-around',
        width:'100%'
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
    },
    subtitle:{
        fontSize: 22,
        fontWeight:'400',
        alignSelf:'center',
        marginVertical:20
    },
    detailsRoutine:{
        // width:'95%'
    },
    dayRow:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        paddingVertical:10,
        paddingHorizontal:10
    },
    buttonsContainer:{
        alignSelf:'center',
        position:'absolute',
        alignItems:'center',
        height:100,
        justifyContent:'space-around',
        bottom:20
    }
});