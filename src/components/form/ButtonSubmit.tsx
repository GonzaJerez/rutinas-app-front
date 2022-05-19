import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'

import { ThemeContext } from '../../context/theme/ThemeContext'

interface Props {
    text: string,
    onPress: any,
    type?: 'primary' | 'secondary',
    style?: StyleProp<ViewStyle>
}

export const ButtonSubmit = ({text, style, type='primary', onPress}:Props) => {

    const { theme:{colors} } = useContext( ThemeContext )

    return (
        <View style={ { alignItems: 'center' } }>
            <TouchableOpacity
            onPress={onPress}
            style={ { 
                ...styles.submitButton, 
                backgroundColor: (type === 'primary') ? colors.primary : colors.background,
                borderColor: colors.background,
                ...style as any 
            } }>
                <Text style={ { 
                    ...styles.textButton, 
                    color: (type === 'primary') ? colors.background : colors.primary } }>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    submitButton: {
        alignItems: 'center',
        borderRadius: 50,
        // borderWidth:1,
        height: 50,
        justifyContent: 'center',
        marginBottom: 20,
        width: 120,
    },
    textButton: {
        fontSize: 20
    },
});