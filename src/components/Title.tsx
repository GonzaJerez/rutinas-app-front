import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/theme/ThemeContext'

interface Props {
    text: string;
    style?: StyleProp<TextStyle>
}

export const Title = ( { text, style }: Props ) => {

    const { theme: { colors } } = useContext( ThemeContext )

    return (
        <Text style={ {
            ...styles.title,
            color: colors.text,
            ...style as any
        } }>
            { text }
        </Text>
    )
}

const styles = StyleSheet.create( {
    title: {
        fontSize: 30,
        fontWeight: '600',
        // marginBottom: 30,
        marginLeft: 5
    },
} );