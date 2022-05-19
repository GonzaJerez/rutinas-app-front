import React, { useContext } from 'react'
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../context/theme/ThemeContext';

interface Props {
    onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export const FloatButton = ({onPress}:Props) => {

    const {theme:{colors}} = useContext(ThemeContext)

    return (
        <TouchableOpacity
            style={ {
                ...styles.floatButton,
                backgroundColor:colors.primary,
            } }
            onPress={ onPress}
        >
            <Icon
                name='add-outline'
                size={ 60 }
                color={colors.background}
                style={styles.icon}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    floatButton:{
        alignItems: 'center',
        borderRadius: 50,
        // borderWidth: 1,
        bottom: 30,
        height: 70,
        justifyContent:'center',
        position: 'absolute',
        right:30,
        width: 70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    icon:{
        right:-2,
        bottom: -1
    }
});