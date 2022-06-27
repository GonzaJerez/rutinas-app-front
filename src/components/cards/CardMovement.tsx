import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../context/auth/AuthContext'
import { ThemeContext } from '../../context/theme/ThemeContext'
import { Movement } from '../../interfaces/interfaces'

interface Props {
    movement: Movement
}

export const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const CardMovement = ({movement}:Props) => {
    
    const {theme} = useContext(ThemeContext)
    const {user} = useContext(AuthContext)
    const {navigate} = useNavigation<any>()

    const isSent = ( movement.from._id === user?._id )
    const dateMovement = new Date(movement.date)
    const dateSpanishFormat = `${dateMovement.getDate()} de ${months[dateMovement.getMonth()]}, ${dateMovement.getFullYear()}`
    

    return (
        <TouchableOpacity 
            onPress={()=>navigate('DetailsMovementScreen',{movement,isSent,dateSpanishFormat})}
            style={ {
                ...styles.movement,
                backgroundColor: theme.colors.card,
            } }
        >
            <View style={ styles.rowMovement }>
                <Text style={ {...styles.label, color:theme.colors.primary} }>{ ( isSent ) ? 'Rutina enviada' : 'Rutina recibida' }</Text>
                <Icon
                    name={ ( isSent ) ? 'arrow-redo-outline' : 'arrow-undo-outline' }
                    color={ ( isSent ) ? 'green' : 'red' }
                    size={ 20 }
                />
            </View>

            <Text style={[styles.label, styles.titleSection, {color:theme.colors.text}]}>Nombre de rutina:</Text>
            <Text style={{...styles.containSection, color: theme.lightText}}>{movement.routineAtSentMoment.name}</Text>

            <Text style={[styles.label, styles.titleSection,{color: theme.colors.text}]}>{(isSent) ? 'Enviado a: ' : 'Recibido de: '}</Text>
            {/* Tarjeta user */}
            {(isSent)
                ? (movement.to.map( (user) => (
                    <View key={user._id} style={[styles.rowMovement, styles.containSection]}>
                        {(user.email)
                            ? (<Text style={{color: theme.lightText}}>{` - ${user.email}`}</Text>)
                            : (<Text style={{color: theme.lightText}}>{user.name}</Text>)
                        }
                    </View>
                )))
                : (
                    <View key={movement.from._id} style={{...styles.rowMovement, marginTop:10}}>
                        <View style={styles.imgContainer}>
                            <Image 
                                style={styles.image}
                                source={(isSent) 
                                    ? (movement.from?.img) 
                                        ? {uri:movement.from.img} 
                                        : require('../../assets/user-not-img.png')
                                    : (movement.from?.img) 
                                        ? {uri:movement.from.img} 
                                        : require('../../assets/user-not-img.png')
                                }
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{...styles.nameUser, color:theme.colors.text}}>{movement.from.name}</Text>
                            <Text style={{color:theme.lightText}}>{movement.from.email}</Text>
                        </View>
                    </View>
                )
            }

            <View style={ styles.date }>
                <Text style={ { color: theme.disabledColor } }>{dateSpanishFormat}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    movement:{
        borderRadius:15,
        marginBottom:20,
        paddingHorizontal:25,
        marginHorizontal:20,
        paddingTop:20,
        paddingBottom:35,
        justifyContent:'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
    },
    rowMovement:{
        flexDirection:'row',
        alignItems:'center',
    },
    label:{
        fontSize:16,
        // fontWeight:'500',
        marginRight:5,
    },
    titleSection:{
        marginTop:10,
        marginLeft:10
    },
    containSection:{
        marginTop:2,
        marginLeft:25
    },
    imgContainer:{
        borderRadius:100,
        width:35,
        height:35,
        marginRight:10
    },
    image:{
        width:35,
        height:35,
        borderRadius:100,
    },
    nameUser:{
        fontWeight:'500',
    },
    date:{
        alignItems:'flex-end',
        position:'absolute',
        bottom:10,
        right:20
    }
});