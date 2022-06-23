import React, { useContext } from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'

import { ThemeContext } from '../../context/theme/ThemeContext'

interface Props {
    size: 'small' | 'medium' | 'big',
    style?: StyleProp<ViewStyle>
}

export const NameApp = ({size, style}:Props) => {

    const { theme: { colors } } = useContext( ThemeContext )
    
    return (
        <View style={ styles.titleContainer }>
            <Text style={ { ...styles.title, color: colors.text, ...styles[size], ...style as any } }>
                Rutinas app
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        // width: 400
        // alignItems: 'center',
        // flex: 2,
        // justifyContent: 'center',
        // marginTop: 40
    },
    title: {
        // fontSize: 40,
    },
    small: {
        fontSize: 16
    },
    medium: {
        fontSize: 30
    },
    big: {
        fontSize: 40
    }
});