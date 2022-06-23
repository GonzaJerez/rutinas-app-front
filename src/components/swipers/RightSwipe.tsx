import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../../context/theme/ThemeContext'

interface Props {
    size?:      'sizeRoutine' | 'sizeDay';
    text?:      string;
    id:         string;
    onDelete:   (id: string) => void;
}

export const RightSwipe = ({id,text='Eliminar', onDelete }:Props) => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    return (
        <View style={ { ...styles.container} }>
            <TouchableOpacity
                style={{...styles.button, backgroundColor:theme.errors}}
                onPress={()=>onDelete(id)}
            >
                <Icon name='trash-outline' size={28} color={colors.text}/>
                <Text style={{color:colors.text}}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        width: 80,
        flexDirection:'row',
        opacity: 0.85,
        marginRight:20,
        marginBottom:15
    },
    button: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width:130,
        left:-50,
        paddingLeft: 30,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
} );