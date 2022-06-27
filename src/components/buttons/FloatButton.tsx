import React, { useContext } from 'react'
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
    onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export const FloatButton = ({onPress}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={ {
                ...styles.floatButton,
                backgroundColor:colors.primary,
            } }
            onPress={ onPress}
        >
            <Icon
                name='add-outline'
                size={ 40 }
                color={theme.whiteColor}
                style={styles.icon}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    floatButton:{
        alignItems: 'center',
        borderRadius: 50,
        bottom: 30,
        height: 60,
        justifyContent:'center',
        position: 'absolute',
        right:30,
        width: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 5,
    },
    icon:{
        right:-1,
        // bottom: -1
    }
});