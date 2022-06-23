import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/theme/ThemeContext';
import {Movement, UserMovement } from '../../interfaces/interfaces';

interface Props {
    isSent:     boolean;
    user?:      UserMovement;
    movement?:  Movement;
}

export const CardUser = ({isSent, user, movement}:Props) => {

    const {theme} = useContext(ThemeContext)

    return (
        <View style={styles.row}>
            <View style={{...styles.userContainer, borderColor:theme.disabledColor, backgroundColor:theme.colors.card}}>
                <View style={styles.dataUser}>
                    <View style={{...styles.imgUser, borderColor:theme.disabledColor}}>
                        <Image 
                            style={styles.image}
                            source={(isSent) 
                                ? (user?.img)
                                    ? {uri:user.img} 
                                    : require('../../assets/user-not-img.png')
                                : (movement?.from?.img) 
                                    ? {uri:movement.from.img} 
                                    : require('../../assets/user-not-img.png')
                            }
                        />
                    </View>
                    <View>
                        <Text style={{...styles.nameUser, color:theme.colors.text}}>{(isSent) ? user?.name : movement?.from.name}</Text>
                        {(user?.email) && (
                            <Text style={{color:theme.disabledColor}}>{(isSent) ? user?.email : movement?.from.email}</Text>
                        )}
                    </View>
                    
                    <View style={styles.iconStatus}>
                        {
                            (user?.status === 'Accepted') && (
                                <Icon 
                                    name='checkmark-circle'
                                    color='green'
                                    size={25}
                                />
                            )
                        }
                        {
                            (user?.status === 'Pending') && (
                                <Icon 
                                    name='pause-circle'
                                    color='grey'
                                    size={25}
                                />
                            )
                        }
                        {
                            (user?.status === 'Rejected') && (
                                <Icon 
                                    name='close-circle'
                                    color='red'
                                    size={25}
                                />
                            )
                        }
                    </View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create( {
    row:{
        flexDirection:'row',
        alignItems:'center',
    },
    userContainer: {
        marginHorizontal: 10,
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        // borderWidth: 1,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 7,
    },
    dataUser: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgUser: {
        borderWidth: 1,
        borderRadius: 100,
        width: 40,
        height: 40,
        marginRight: 10
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    nameUser: {
        fontSize: 16,
        fontWeight: '500'
    },
    iconStatus:{
        marginLeft:10
    }
} );