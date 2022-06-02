import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../../context/theme/ThemeContext'

interface Props {
    onPress?: ((event: GestureResponderEvent) => void)
    style?: StyleProp<ViewStyle>
}

export const FloatDeleteIcon = ({style,onPress}:Props) => {

    const {theme} = useContext(ThemeContext)

  return (
    <TouchableOpacity 
        style={{
            ...styles.deleteIcon, 
            backgroundColor:theme.colors.background,
            ...style as any
        }}
        onPress={onPress}
    >
        <Icon 
            name='trash-outline'
            size={30}
            color={theme.errors}
            style={{opacity:0.8}}
        />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    deleteIcon:{
        borderRadius: 50,
        padding:5,
        // opacity:0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
});