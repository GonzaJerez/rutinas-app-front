import React, { useContext } from 'react'
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
    text:    string;
    style?:  StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress: ((event: GestureResponderEvent) => void) | undefined;
}

export const SecondaryButton = ({text, style,disabled=false, onPress}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    return (
        <TouchableOpacity
            style={ { ...styles.secondaryButton, ...style as any } }
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={ { ...styles.textButton, color: (disabled) ? theme.colors.background : colors.primary } }>{text}</Text>
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
        fontSize: 16
    }
});