import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { AuthContext } from '../../context/auth/AuthContext';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { Group } from '../../interfaces/interfaces'
import { RootSocialTopNavigator } from '../../router/SocialTopNavigator';

interface Props {
    group:      Group;
    onPress:    () => void
}

export const CardGroup = ({group, onPress}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {user} = useContext(AuthContext)

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={{
                ...styles.cardContainer, 
                backgroundColor:theme.colors.card,
            }}
        >
            {(group.admin._id === user?._id)
                && (
                    <Text style={{...styles.textAdmin, color:theme.colors.primary}}>ADMIN</Text>
                )
            }
            <View style={styles.headerRow}>
                <Image 
                    source={(group.img)
                        ? {uri: group.img}
                        : require('../../assets/user-not-img.png')
                    }
                    style={styles.image}
                />
                <Text style={{...styles.nameGroup, color:theme.colors.text}}>{group.name}</Text>
            </View>
            <View style={styles.usersContainer}>
                {(group.users.map( (userInGroup, index) => (
                    <Text style={{color:theme.lightText}} key={userInGroup._id}>{(index === 0 ? '' : ' - ')}{userInGroup.name}</Text>
                )))}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer:{
        marginHorizontal:20,
        paddingTop:40,
        paddingBottom:20,
        borderRadius:25,
        paddingHorizontal:20,
        marginBottom:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
    },
    textAdmin:{
        position:'absolute',
        top:15,
        right:20,
        fontWeight:'600',
    },
    headerRow:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    },
    image: {
        width:50,
        height:50,
        marginRight:20,
        borderRadius:100
    },
    nameGroup:{
        fontSize:20
    },
    usersContainer:{
        marginLeft:5,
        flexDirection:'row',
        flexWrap:'wrap'
    }
});