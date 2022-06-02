import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../../context/theme/ThemeContext'

interface Props {
    size: 'sizeRoutine' | 'sizeDay';
    id: string;
    onDelete: (id: string) => void;
}

export const RightSwipe = ({size, id, onDelete }:Props) => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    return (
        <View style={ { ...styles.container, ...styles[size] } }>
            <TouchableOpacity
                style={{...styles.button, backgroundColor:theme.errors}}
                onPress={()=>onDelete(id)}
            >
                <Icon name='trash-outline' size={30} color={colors.text}/>
                <Text style={{...styles.buttonsText, color:colors.text}}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        width: 80,
        flexDirection:'row',
        opacity: 0.85,
        marginRight:20
        // marginVertical:10
    },
    sizeRoutine: {
        height:180
    },
    sizeDay: {
        height:100
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
    buttonsText: {
        fontSize: 16,
    }
} );