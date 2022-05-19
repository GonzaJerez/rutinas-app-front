import React, { useContext } from 'react'
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemeContext } from '../context/theme/ThemeContext';

interface Props {
    text:    string;
    style?:  StyleProp<ViewStyle>;
    onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export const SecondaryButton = ({text, style, onPress}:Props) => {

    const {theme:{colors}} = useContext(ThemeContext)

    return (
        <TouchableOpacity
            style={ { ...styles.secondaryButton, ...style as any } }
            onPress={onPress}
        >
            <Text style={ { ...styles.textButton, color: colors.primary } }>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    secondaryButton:{
        // position:'absolute'
        justifyContent: 'center',
        alignItems:'center'
    },
    textButton:{
        fontSize: 18
    }
});